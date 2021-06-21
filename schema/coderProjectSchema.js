const graphql = require('graphql');

const { getCoders, getProjectCoders, getCoder, addCoder,
    updateCoder, deleteCoder, getMutualCoders } = require('../controllers/coderControllers');
const { getProjects, getCoderProjects, getProject, addProject,
    updateProject, deleteProject, getMutualProjects } = require('../controllers/projectControllers');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,
    GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;


// Return types
const ProjectType = new GraphQLObjectType(
    {
        name: 'Project',
        fields: () => ({
                id: { type: GraphQLID },
                coderIds: { type: new GraphQLList(GraphQLID) },
                name: { type: GraphQLString },
                details: { type: GraphQLString },
                coders: {
                    type: new GraphQLList(CoderType),
                    resolve(parent, _args) { return getProjectCoders(parent.id); }
                }
        })
    });

const CoderType = new GraphQLObjectType(
    {
        name: 'Coder',
        fields: () => ({
            id: { type: GraphQLID },
            projectIds: { type: new GraphQLList(GraphQLID) },
            name: { type: GraphQLString },
            level: { type: GraphQLInt },
            projects: {
                type: new GraphQLList(ProjectType),
                resolve(parent, _args) { return getCoderProjects(parent.id); }
            }
        })
    });

// Reading data
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields:
        {
            project:
                {
                    type: ProjectType,
                    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
                    resolve(_parent, args) { return getProject(args.id); }
                },

            coder:
                {
                    type: CoderType,
                    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
                    resolve(_parent, args) { return getCoder(args.id); }
                },

            coders:
                {
                    type: new GraphQLList(CoderType),
                    resolve(_parent, _args) { return getCoders(); }
                },

            projects:
                {
                    type: new GraphQLList(ProjectType),
                    resolve(_parent, _args) { return getProjects(); }
                },
            
            mutualCoders:
                {
                    type: new GraphQLList(CoderType),
                    args: 
                    { 
                        project1Id: { type: GraphQLID },
                        project2Id: { type: GraphQLID }
                    },
                    resolve(_parent, args) { return getMutualCoders(args.project1Id, args.project2Id); }
                },

            mutualProjects:
                {
                    type: new GraphQLList(ProjectType),
                    args:
                    {
                        coder1Id: { type: GraphQLID },
                        coder2Id: { type: GraphQLID },
                    },
                    resolve(_parent, args) { return getMutualProjects(args.coder1Id, args.coder2Id);; }
                },
        }
    });


// Anything other than reading
const Mutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
        {
            addCoder:
            {
                type: CoderType,
                args:
                {
                    id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    level: { type: GraphQLInt },
                    projectIds: { type: new GraphQLList(GraphQLID) }
                },
                resolve(_parent, args) { return addCoder(args); }
            },
            addProject:
            {
                type: ProjectType,
                args:
                {
                    id: { type: GraphQLID },
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    details: { type: GraphQLString },
                    coderIds: { type: new GraphQLList(GraphQLID) }
                },
                resolve(_parent, args) { return addProject(args); }
            },

            updateCoder:
            {
                type: CoderType,
                args:
                {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                    name: { type: GraphQLString },
                    level: { type: GraphQLInt }
                },
                resolve(_parent, args) { return updateCoder(args); }
            },
            updateProject:
            {
                type: ProjectType,
                args:
                {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                    name: { type: GraphQLString },
                    details: { type: GraphQLString },
                    coderIds: { type: new GraphQLList(GraphQLID) }
                },
                resolve(_parent, args) { return updateProject(args); }
            },

            deleteCoder:
            {
                type: CoderType,
                args: { id: { type: new GraphQLNonNull(GraphQLID) } },
                resolve(_parent, args) { return deleteCoder(args); }
            },
            deleteProject:
            {
                type: ProjectType,
                args: { id: { type: new GraphQLNonNull(GraphQLID) }, },
                resolve(_parent, args) { return deleteProject(args); }
            }
        }
    });


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});