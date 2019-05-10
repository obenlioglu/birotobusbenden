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
    }
};

module.exports = Query;