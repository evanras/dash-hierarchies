import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * TableHierarchyRow - Renders a single row in the hierarchical table with multiple columns
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Row data containing children array and arbitrary columns
 * @param {number} props.level - Current nesting level for indentation
 * @param {Array} props.columns - Array of column objects with name and width properties
 * @param {string} props.indexColumnName - Name of the column that acts as the index (leftmost)
 * @param {React.ReactNode} props.openCaret - Icon to show when item is expanded
 * @param {React.ReactNode} props.closedCaret - Icon to show when item is collapsed
 * @param {Function} props.onRowClick - Callback function when row is clicked
 * @param {Object} props.cellStyles - Default styles for cells
 * @param {string} props.hoveredColumn - Name of column currently being hovered
 * @param {Object} props.selectedColumn - Currently selected column (for controlled component)
 * @returns {React.ReactNode} - Rendered row with optional children
 */
const TableHierarchyRow = ({
  item,
  level = 0,
  columns,
  indexColumnName,
  openCaret,
  closedCaret,
  onRowClick,
  cellStyles,
  hoveredColumn,
  selectedColumn
}) => {
  // Track expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Determine if this item has children
  const hasChildren = item.children && item.children.length > 0;
  
  // Calculate indentation based on nesting level
  const indentPadding = `${level * 1}em`;
  
  // Toggle expanded state
  const toggleExpand = (e) => {
    // Stop propagation to prevent row click handler from firing
    e.stopPropagation();
    
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Handle row click
  const handleRowClick = () => {
    // Call the parent's click handler and pass the item data
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <>
      {/* Item Row */}
      <tr 
        style={{ 
          cursor: 'pointer'
        }}
        onClick={handleRowClick}
      >
        {/* Index Column with Indentation and Caret */}
        <td 
          style={{
            ...cellStyles,
            position: 'sticky',
            left: 0,
            backgroundColor: 'white',
            zIndex: 1,
            borderRight: '1px solid #e5e7eb',
            boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            paddingLeft: indentPadding 
          }}>
            {hasChildren ? (
              <button 
                onClick={toggleExpand} 
                style={{ 
                  marginRight: '0.5em', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.125em',
                  width: '1.5em'
                }}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? openCaret : closedCaret}
              </button>
            ) : (
              <div style={{ marginRight: '0.2em', width: '1.5em' }}></div> // Placeholder for alignment
            )}
            
            {/* Item Name */}
            <div style={{ fontWeight: 500 }}>
              {item[indexColumnName]}
            </div>
          </div>
        </td>
        
        {/* Other Columns */}
        {columns
          .filter(col => col.name !== indexColumnName)
          .map((column) => (
            <td 
              key={column.name} 
              style={{
                ...cellStyles,
                width: column.width || 'auto',
                backgroundColor: (hoveredColumn === column.name || selectedColumn?.name === column.name) 
                  ? '#f0f7ff' // Light blue highlight
                  : 'transparent'
              }}
            >
              {item[column.name] !== undefined ? item[column.name] : ''}
            </td>
          ))
        }
      </tr>
      
      {/* Render Children if Expanded */}
      {hasChildren && isExpanded && (
        <>
          {item.children.map((child, index) => (
            <TableHierarchyRow
              key={`${child[indexColumnName]}-${index}`}
              item={child}
              level={level + 1}
              columns={columns}
              indexColumnName={indexColumnName}
              openCaret={openCaret}
              closedCaret={closedCaret}
              onRowClick={onRowClick}
              cellStyles={cellStyles}
              hoveredColumn={hoveredColumn}
              selectedColumn={selectedColumn}
            />
          ))}
        </>
      )}
    </>
  );
};

/**
 * TableHierarchy - A Dash component for displaying hierarchical data in a table format
 * with multiple columns, sticky headers, and expandable rows.
 * 
 * This component displays hierarchical data in a table format with support for:
 * - Multiple columns
 * - Sticky index column (leftmost)
 * - Sticky headers
 * - Expandable/collapsible rows
 * - Column selection callbacks
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - The ID used to identify this component in Dash callbacks
 * @param {Array} props.data - Array of data items with arbitrary columns and optional children arrays
 * @param {Array} props.columns - Array of column definitions with name and width properties
 * @param {string} props.indexColumnName - Name of the column to use as the index (leftmost column)
 * @param {Object} props.style - Custom styles to apply to the container
 * @param {string} props.className - CSS class names to apply to the container
 * @param {Object} props.selectedItem - Currently selected item (for controlled component)
 * @param {Object} props.selectedColumn - Currently selected column (for controlled component)
 * @param {Function} props.setProps - Dash callback to update props
 * @returns {React.ReactNode} - Rendered hierarchical table component
 */
const TableHierarchy = (props) => {
  const { 
    id,
    data = [], 
    columns = [],
    indexColumnName,
    style = {},
    className = '',
    selectedItem = null,
    selectedColumn = null,
    setProps
  } = props;

  // Create a ref for the container div
  const containerRef = useRef(null);
  // Track table dimensions
  const [tableDimensions, setTableDimensions] = useState({
    width: 0,
    height: 0
  });
  
  // Track which column is being hovered over
  const [hoveredColumn, setHoveredColumn] = useState(null);

  // Update table dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setTableDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // Initial dimensions
    updateDimensions();

    // Add event listener
    window.addEventListener('resize', updateDimensions);

    // Clean up
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Define SVG for carets to avoid external dependencies
  const openCaret = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
  
  const closedCaret = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );

  // Handle row click
  const handleRowClick = (item) => {
    if (setProps) {
      // Create a copy of the item without the children property
      const { children, ...itemWithoutChildren } = item;
      
      // Update the selectedItem property in Dash
      setProps({ selectedItem: itemWithoutChildren });
    }
  };

  // Handle column header click
  const handleColumnHeaderClick = (columnName) => {
    if (setProps && columnName !== indexColumnName) {
      // Gather all values in this column along with corresponding index values
      const gatherColumnData = (items, columnName, indexColumnName, result = []) => {
        items.forEach(item => {
          if (item[columnName] !== undefined && item[indexColumnName] !== undefined) {
            // Create a dictionary with index column name as key and column value
            const rowData = {
              [indexColumnName]: item[indexColumnName],
              value: item[columnName]
            };
            result.push(rowData);
          }
          
          if (item.children && item.children.length > 0) {
            gatherColumnData(item.children, columnName, indexColumnName, result);
          }
        });
        
        return result;
      };
      
      const columnData = gatherColumnData(data, columnName, indexColumnName);
      
      // Update the selectedColumn property in Dash
      setProps({ 
        selectedColumn: {
          name: columnName,
          data: columnData
        }
      });
    }
  };
  
  // Handle column header hover
  const handleColumnHeaderHover = (columnName) => {
    setHoveredColumn(columnName);
  };
  
  // Handle column header hover end
  const handleColumnHeaderLeave = () => {
    setHoveredColumn(null);
  };

  // Default styles for cells
  const cellStyles = {
    padding: '0.75em 1em',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap'
  };

  // Default styles for header cells
  const headerCellStyles = {
    ...cellStyles,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderBottom: '2px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 2
  };

  return (
    <div 
      id={id}
      className={className} 
      ref={containerRef}
      style={{
        width: '100%',
        maxHeight: '500px', // Default max height, can be overridden via style prop
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #e5e7eb',
        borderRadius: '0.25em',
        ...style
      }}
    >
      <table style={{ 
        width: '100%', 
        borderCollapse: 'separate',
        borderSpacing: 0,
        tableLayout: 'fixed'
      }}>
        <thead>
          <tr>
            {/* Index Column Header (Sticky) */}
            <th 
              style={{
                ...headerCellStyles,
                position: 'sticky',
                left: 0,
                zIndex: 3, // Higher z-index for the corner
                backgroundColor: 'white',
                borderRight: '1px solid #e5e7eb',
                width: columns.find(col => col.name === indexColumnName)?.width || '200px',
                boxShadow: '2px 0 4px -2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {indexColumnName}
            </th>
            
            {/* Other Column Headers */}
            {columns
              .filter(col => col.name !== indexColumnName)
              .map((column) => (
                <th 
                  key={column.name}
                  style={{
                    ...headerCellStyles,
                    width: column.width || 'auto',
                    cursor: column.name !== indexColumnName ? 'pointer' : 'default',
                    backgroundColor: (hoveredColumn === column.name || selectedColumn?.name === column.name) 
                      ? '#e1efff' // Slightly darker blue for header highlighting
                      : 'white'
                  }}
                  onClick={() => handleColumnHeaderClick(column.name)}
                  onMouseEnter={() => handleColumnHeaderHover(column.name)}
                  onMouseLeave={handleColumnHeaderLeave}
                  title={column.name !== indexColumnName ? "Click to select column" : ""}
                >
                  {column.name}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableHierarchyRow
              key={`${item[indexColumnName]}-${index}`}
              item={item}
              level={0}
              columns={columns}
              indexColumnName={indexColumnName}
              openCaret={openCaret}
              closedCaret={closedCaret}
              onRowClick={handleRowClick}
              cellStyles={cellStyles}
              hoveredColumn={hoveredColumn}
              selectedColumn={selectedColumn}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * PropTypes for the TableHierarchy component
 * These define the expected properties and their types for Dash
 */
TableHierarchy.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: PropTypes.string,

  /**
   * The hierarchical data to display.
   * Each item should have arbitrary columns and an optional children array.
   */
  data: PropTypes.array,

  /**
   * Array of column definitions.
   * Each column should have a name and optional width property.
   * Example: [{ name: 'Forecast Decomposition', width: '250px' }, { name: 'January 2024' }]
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    width: PropTypes.string
  })),

  /**
   * Name of the column to use as the index (leftmost column).
   * This column will be sticky when horizontally scrolling.
   */
  indexColumnName: PropTypes.string.isRequired,

  /**
   * Inline styles to apply to the outer div.
   */
  style: PropTypes.object,

  /**
   * CSS class names to apply to the outer div.
   */
  className: PropTypes.string,

  /**
   * Object representing the currently selected item (controlled component pattern).
   * This will be updated when a row is clicked.
   * Contains all properties of the selected item except the 'children' array.
   */
  selectedItem: PropTypes.object,

  /**
   * Object representing the currently selected column (controlled component pattern).
   * This will be updated when a column header is clicked.
   * Contains the column name and data which is an array of objects with the index column value and the value for this column.
   */
  selectedColumn: PropTypes.shape({
    name: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  }),

  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: PropTypes.func
};

/**
 * Default properties for the TableHierarchy component.
 */
TableHierarchy.defaultProps = {
  data: [],
  columns: [],
  style: {},
  selectedItem: null,
  selectedColumn: null
};

export default TableHierarchy;