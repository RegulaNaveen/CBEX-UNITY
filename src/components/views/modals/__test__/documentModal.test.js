/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DocumentModal from '../documentModal'

describe('Test Document Cookie Modal Component', () => {
    
    test('Load Document Cookie Modal component', async () => {
      await render( <DocumentModal /> )
      expect(screen.getByText(/Enable Cookies/i)).toBeInTheDocument();
    })
})
