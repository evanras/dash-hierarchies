% Auto-generated: do not edit by hand
\name{simpleHierarchy}

\alias{simpleHierarchy}

\title{SimpleHierarchy component}

\description{
SimpleHierarchy - A Dash component for displaying hierarchical data with expandable sections  This component displays hierarchical data with collapsible sections, percentage indicators,  and progress bars. It is designed to be used as a Dash component.  @param {Object} props - Component props @param {string} props.id - The ID used to identify this component in Dash callbacks @param {Array} props.data - Array of data items with name, percentage, and optional children @param {Object} props.colors - Colors for the progress bars @param {string} props.colors.primary - Color for the filled portion of progress bars @param {string} props.colors.background - Color for the unfilled portion of progress bars @param {Object} props.styles - Custom styles to apply to the container @param {string} props.className - CSS class names to apply to the container @param {string} props.selectedItem - Name of the currently selected item (for controlled component) @param {Function} props.setProps - Dash callback to update props @returns {React.ReactNode} - Rendered hierarchical data component
}

\usage{
simpleHierarchy(id=NULL, className=NULL, colors=NULL, data=NULL,
selectedItem=NULL, styles=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{className}{Character. CSS class names to apply to the outer div.}

\item{colors}{Lists containing elements 'primary', 'background'.
those elements have the following types:
  - primary (character; optional)
  - background (character; optional). Colors for the component.}

\item{data}{List of lists containing elements 'name', 'percentage', 'children'.
those elements have the following types:
  - name (character; required)
  - percentage (numeric; required)
  - children (unnamed list; optional)s. The hierarchical data to display.
Each item should have a name, percentage, and optional children array.}

\item{selectedItem}{Named list. Object representing the currently selected item (controlled component pattern).
This will be updated when a row is clicked.
Contains all properties of the selected item except the 'children' array.}

\item{styles}{Named list. Inline styles to apply to the outer div.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

