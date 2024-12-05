import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";


const getExpandCollapseVerticalTrigger = (triggerName: string, expandedState: string, collapsedState: string, minHeight: string = '0px', animationDuration: string = '600ms') => {
    return trigger(triggerName, [
        state(expandedState, style({ height: '*', visibility: 'inherit', overflow: 'hidden' })), // overflow: 'hidden' is required to prevent the content from overflowing the container
        state(collapsedState, style({ height: minHeight, visibility: 'inherit', overflow: 'hidden' })),
        transition(
            '__collapsed <=> __expanded',
            group([
                animate('{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)'),
                query('@*', animateChild(), { optional: true }),
            ]),
            {
                params: { 'animationDuration': animationDuration },
            },
        )
    ]);
}

const getExpandCollapseHorizontalTrigger = (triggerName: string, expandedState: string, collapsedState: string, animationDuration: string = '600ms') => {
    return trigger(triggerName, [
        state(expandedState, style({ width: '*', visibility: 'inherit', overflow: 'hidden' })), // overflow: 'hidden' is required to prevent the content from overflowing the container
        state(collapsedState, style({ width: '0px', visibility: 'hidden', overflow: 'hidden' })),
        transition(
            '__collapsed <=> __expanded',
            group([
                animate('{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)'),
                query('@*', animateChild(), { optional: true }),
            ]),
            {
                params: { 'animationDuration': animationDuration },
            },
        )
    ]);
}

export { getExpandCollapseHorizontalTrigger, getExpandCollapseVerticalTrigger };