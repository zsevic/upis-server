export const user = async (variables) => api.post('/graphql').send({
  query: `
            query ($id: ID!) {
                user(id:$id) {
                    id
                    username
                    email
                    role
                }
            }
        `,
  variables,
});

export const signIn = async (variables) => api.post('/graphql').send({
  query: `
        mutation ($login: String!, $password: String!) {
            signIn(login:$login, password:$password) {
                token
            }
        }
      `,
  variables,
});

export const deleteUser = async (variables, token) => api.post('/graphql').send(
  {
    query: `
        mutation($id:ID!) {
            deleteUser(id:$id)
        }
      `,
    variables,
  },
  {
    headers: { 'x-token': token },
  },
);
