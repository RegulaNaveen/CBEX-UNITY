/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnityFooter from '../Footer'

describe('Test Footer Component', () => {
    
    test('Load footer component', async () => {
      await render( <UnityFooter questionTemplateVersionNumber = {""} opportunityType={""} /> )
      expect(screen.getByText(/IQVIA/i)).toBeInTheDocument();
    })
    test('Check templateversion no', async () => {
      await render( <UnityFooter questionTemplateVersionNumber = {"version-0.29"} opportunityType={""} /> )
      expect(screen.getByText(/version-0.29/i)).toBeInTheDocument();
    })
    test('Check Opportunity type', async () => {
      await render( <UnityFooter questionTemplateVersionNumber = {"version-0.29"} opportunityType={"Core Clinical"} /> )
      expect(screen.getByText(/Core Clinical/i)).toBeInTheDocument();
    })
})
