import React from "react";

export type Falsy = false | null | undefined;

export function styled(wrapped: keyof React.ReactDOM | React.ComponentType): any {
    function createStyled(
        factory: any,
        ...classes: any[]
    ): any {
        const Component = React.forwardRef(function (props: any, ref?: React.Ref<any>): JSX.Element | null {
            const className = props.className || undefined;
            return factory(wrapped, { ...props, ref, className });
        });

        const Styled = Component as any;
        Styled.named = (displayName: any | Falsy) => {
            Styled.displayName = displayName;
            return Styled;
        };
        Styled.withRenderer = (nextFactory: any) => createStyled(nextFactory, ...classes);
        return Styled;
    }

    return (...classes: any[]) => createStyled(React.createElement, ...classes);
}
