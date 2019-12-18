import React, { Component } from 'react';
import { findAllByTestId } from '@testing-library/react';

export default class FolderError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: findAllByTestId
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return (
                <p className="folderError">Error: Opps folders could not be loaded. Please try again.</p>
            );
        }
        return this.props.children;
    }

}