const { GraphQLServer } = require('graphql-yoga');

const links = [{
    id: 'link_0',
    description: 'React quiz',
    url: 'http://localhost:5033'
}]

const resolvers = {
    Query: {
        info: () => `This is an information about graphql query`,
        feed: () => links
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link_${args.url}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        }
    }
};

const server = new GraphQLServer({ typeDefs: './scheme/index.graphql', resolvers });

server.start(() => console.log('Server is running now on http://localhost:4000'));
