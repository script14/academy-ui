export default function createLoopbackFilterObject(info, columns) {
    var loopbackFilter = {
        filter: {
            where: {},
            limit: info.limit,
            skip: info.offset
        }
    };

    if (info.search) {
        loopbackFilter.filter.where["or"] = columns.map(col => {
            var criterion = {}
            criterion[col] = { "regexp": `^${info.search}/i` }
            return criterion;
        });
    }

    if (info.sort && info.order)
        loopbackFilter.filter.order = `${info.sort} ${info.order}`;

    return loopbackFilter;
}