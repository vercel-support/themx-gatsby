const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  const GET_CATEGORIES = `
		query GET_CATEGORIES($first:Int) {
			wpgraphql {
				categories(first: $first) {
					pageInfo {
						hasNextPage
						endCursor
					}
					nodes {
						id
						categoryId
						slug
						uri
						parent {
							slug
						}
						ancestors {
							slug
						}
						children {
							nodes {
								uri
								categoryId
								slug
								id
								parent {
									slug
								}
								ancestors {
									slug
								}
								children {
									nodes {
										uri
										slug
										categoryId
										id
										parent {
											slug
										}
										ancestors {
											slug
										}
									}
								}
							}
						}
					}
				}
			}		
		}
	`
  const { createPage } = actions
  const allCategories = []

  const fetchCategories = async variables =>
    await graphql(GET_CATEGORIES, variables).then(({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(category => {
        allCategories.push(category)
        category.children.nodes.map(childone => {
          allCategories.push(childone)
          childone.children.nodes.map(childtwo => {
            allCategories.push(childtwo)
          })
        })
      })
      if (hasNextPage) {
        return fetchCategories({ first: variables.first, after: endCursor })
      }
      return allCategories
    })

  // Map over all categories
  await fetchCategories({ first: 100, after: null }).then(allCategories => {
    const destinationsTemplate = path.resolve(
      `./src/templates/categoryDestinations.js`
    )
    const countriesTemplate = path.resolve(
      `./src/templates/categoryCountries.js`
    )
    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    allCategories.map(category => {
      if (category.slug === "bestemmingen") {
        console.log(`create category: ${category.uri}`)
        createPage({
          path: `${category.uri}`,
          component: destinationsTemplate,
          context: category,
        })
      } else if (category.ancestors && category.parent.slug != "bestemmingen") {
        console.log(`HEEEEEEEEEENK: ${category.uri}`)
        createPage({
          path: `${category.uri}`,
          component: countriesTemplate,
          context: category,
        })
      } else {
        console.log(`create category: ${category.uri}`)
        createPage({
          path: `${category.uri}`,
          component: categoryTemplate,
          context: category,
        })
      }
    })
  })
}
