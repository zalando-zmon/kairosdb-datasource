import _ from "lodash";
import {PromiseUtils} from "../utils/promise_utils";

const METRIC_NAMES_SUGGESTIONS_LIMIT = 20;

export class MetricNameFieldCtrl {
    public value: string;
    public metricNames: string[];
    public alias: string;
    public segment: any;
    public aliasInputVisible: boolean = false;
    public aliasAddedVisible: boolean = false;
    private $q: any;
    private $scope: any;
    private promiseUtils: PromiseUtils;
    private checkId: string;

    /** @ngInject **/
    constructor($scope, $q, private uiSegmentSrv) {
        this.$scope = $scope;
        this.$q = $q;
        this.uiSegmentSrv = uiSegmentSrv;
        this.promiseUtils = new PromiseUtils($q);
        this.segment = this.value ? uiSegmentSrv.newSegment(this.value) : uiSegmentSrv.newSelectMetric();
        this.aliasAddedVisible = !_.isNil(this.alias);
        this.checkId = this.getZmonCheck(this.value);
    }

    public onChange(segment): void {
        this.value = this.$scope.getMetricInputValue();
        this.checkId = this.getZmonCheck(this.value);
    }

    public suggestMetrics(): string[] {
        const query = this.$scope.getMetricInputValue();
        return this.promiseUtils.resolvedPromise(this.metricNames
            .filter((metricName) => _.includes(metricName, query))
            .sort(this.sortForZmon)
            .slice(0, METRIC_NAMES_SUGGESTIONS_LIMIT)
            .map((metricName) => {
                return this.uiSegmentSrv.newSegment(metricName);
            }));
    }

    public setAlias(alias): void {
        if (!_.isEmpty(alias)) {
            this.alias = alias;
            this.aliasAddedVisible = true;
        }
        this.aliasInputVisible = false;
    }

    private getZmonCheck(value): string {
        if (!value) {
            return null;
        }
        const match = value.match("zmon.check.(\\d+)");
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    private sortForZmon(left, right): number {
        // prioritize metric names that start with z
        if (left.charAt(0) === "z" && right.charAt(0) !== "z") {
            return -1;
        } else if (left.charAt(0) !== "z" && right.charAt(0) === "z") {
            return 1;
        } else {
            return left.localeCompare(right);
        }
    }
}

export class MetricNameFieldLink {
    constructor(scope, element) {
        scope.getMetricInputValue = () => {
            return element[0].getElementsByTagName("input")[0].value;
        };
    }
}

export function MetricNameFieldDirective() {
    return {
        bindToController: true,
        controller: MetricNameFieldCtrl,
        controllerAs: "ctrl",
        link: MetricNameFieldLink,
        restrict: "E",
        scope: {
            alias: "=",
            metricNames: "=",
            value: "="
        },
        templateUrl: "public/plugins/grafana-kairosdb-datasource/partials/metric.name.field.html"
    };
}
