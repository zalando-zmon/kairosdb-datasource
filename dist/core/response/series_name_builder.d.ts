export declare class SeriesNameBuilder {
    private static SEPARATOR;
    build(metricName: any, alias: any, groupBys?: any[]): any;
    private buildDefault(tagGroupBysValues, valueGroupBysValues, timeGroupBysValues);
    private buildAlias(alias, tagGroupBys, valueGroupBysValues, timeGroupBysValues);
    private getTagGroupBys(groupBys);
    private getValueGroupBys(groupBys);
    private getTimeGroupBys(groupBys);
    private getGroupByExpression(type, value);
}
