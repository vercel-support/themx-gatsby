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
						children {
							nodes {
								uri
								categoryId
								slug
								id
								ancestors {
									name
								}
								children {
									nodes {
										uri
										slug
										categoryId
										id
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
    const bestemmingenTemplate = path.resolve(
      `./src/templates/categoryBestemmingen.js`
    )
    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    allCategories.map(category => {
      console.log(`create category: ${category.uri}`)
      if (category.slug === "bestemmingen") {
        createPage({
          path: `${category.uri}`,
          component: bestemmingenTemplate,
          context: category,
        })
      } else {
        createPage({
          path: `${category.uri}`,
          component: categoryTemplate,
          context: category,
        })
      }
    })
  })
}
