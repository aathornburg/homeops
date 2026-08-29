import type { FileRouteTypes } from "../routeTree.gen";

export type RouteDestination = FileRouteTypes['to'];

declare const calendarDateBrand: unique symbol;
export type CalendarDate = string & {
  readonly [calendarDateBrand]: true;
};
