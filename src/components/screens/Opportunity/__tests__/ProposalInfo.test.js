/**
 * @js-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import ProposalInfo from "../ProposalInfo";

describe('testing proposal info component', () => {
    const data = {
        "CRM #": "UZA82669",
        "Product name": "dcc - 2618 -",
        "Therapeutic area": "Acute Care",
        "Protocol number": "dcc - 2618 - 01 - 009",
        "Line of business": "Core Clinical",
        "n/a": "Request failed with status code 400",
        "Bid due date": "2025-05-09",
        "Customer": "Test-Sync",
        "Verbatim indication": "test",
        "Is this IQVIA Biotech": "No",
        "Phase": "Phase 2",
        "BoxId": "148739516940",
        "opportunityId": "00601000009fThmAAE",
        "agreementId": "aM701000000GrWqCAK"
    };

    test('render the componet without data', () => {
        const { container } = render(<ProposalInfo data={{ "Bid due date": "" }} />);

        expect(container).toBeInTheDocument();
    });

    test('render the component with data', () => {
        const { container } = render(<ProposalInfo data={data} />);

        expect(container).toBeInTheDocument();
    });
});
