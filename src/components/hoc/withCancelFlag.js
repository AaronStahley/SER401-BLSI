import React from 'react';

let withCancelFlag = (WrappedComponent) => {
    class CancelFlagInjector extends React.Component {
        stack = [];

        componentWillUnmount() {
            this.stack.forEach(promise => promise.cancel())
        }

        register(promise) {
            this.stack.push(promise);
            return promise;
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    cancelFlag={this}
                />
            );
        }
    }

    return CancelFlagInjector;
};
export default withCancelFlag;