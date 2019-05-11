const Query = {
    posts: async(parent, args, { prisma }, info) => {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                isActive: args.status
            }
        };
        
        return prisma.query.posts(opArgs, info);
    },

    types: async(parent, args, { prisma }, info) => {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };
        
        return prisma.query.types(opArgs, info);
    },
};

module.exports = Query;