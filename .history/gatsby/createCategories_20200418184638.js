const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  const GET_CATEGORIES = `
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
      })
      if (hasNextPage) {
        return fetchCategories({ first: variables.first, after: endCursor })
      }
      return allCategories
    })

  // Map over all categories
  await fetchCategories({ first: 100, after: null }).then(allCategories => {
    const categoryTemplate = path.resolve(`./src/templates/category.js`)
    allCategories.map(category => {
      console.log(`create category: ${category.slug}`)
      createPage({
        path: `categorie/${category.slug}`,
        component: categoryTemplate,
        context: category,
      })
    })
  })
}
