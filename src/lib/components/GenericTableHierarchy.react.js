import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * GenericTableHierarchyRow - Renders a single row in the hierarchical table
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Row data containing optional children array and arbitrary data fields
 * @param {number} props.level - Current nesting level for indentation
 * @param {Array} props.columns - Array of column objects with name properties to display
 * @param {Function} props.onRowClick - Callback function when row is clicked
 * @param {Object} props.colors - Object containing hoverColor and selectedColor values
 * @param {string} props.uniqueKey - Property name to use as unique identifier for each row
 * @param {Object} props.selectedRow - Currently selected row data (for highlighting)
 * @param {string} props.dataKey - Key to use when comparing selected row with current row
 * @param {string} props.highlightKey - Optional secondary key to check for highlighting
 * @param {Object} props.expandedRows - Map of expanded row IDs
 * @param {Function} props.setExpandedRows - Function to update expanded rows state
 * @returns {React.ReactNode} - Rendered row with optional children
 */
const GenericTableHierarchyRow = ({
  item,
  level = 0,
  columns,
  onRowClick,
  colors,
  uniqueKey,
  selectedRow,
  dataKey,
  highlightKey,
  expandedRows,
  setExpandedRows
}) => {
  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if this item has children
  const hasChildren = item.children && item.children.length > 0;
  
  // Calculate indentation based on nesting level
  const indentPadding = `${level * 20}px`;
  
  // Generate a unique identifier for this row
  const rowId = item[uniqueKey] || `row-${level}-${JSON.stringify(item).slice(0, 20)}`;
  
  // Check if this row is currently expanded
  const isExpanded = expandedRows[rowId] || false;
  
  // Toggle expanded state
  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevent row selection when clicking the toggle button
    
    if (hasChildren) {
      // Update the expanded rows map
      setExpandedRows(prev => {
        const newExpandedRows = { ...prev };
        if (newExpandedRows[rowId]) {
          delete newExpandedRows[rowId];
        } else {
          newExpandedRows[rowId] = true;
        }
        return newExpandedRows;
      });
    }
  };
  
  // Handle row click
  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };
  
  // Determine if this row is selected
  const isSelected = selectedRow && 
    (selectedRow[dataKey] === item[dataKey] || 
    (highlightKey && selectedRow[highlightKey] === item[highlightKey]));
  
  // Function to render caret for expandable rows
  const renderCaret = () => {
    if (!hasChildren) {
      // Empty space for alignment
      return <span style={{ width: '20px', display: 'inline-block' }}></span>;
    }
    
    return (
      <button
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse" : "Expand"}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          width: '20px',
          height: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isExpanded ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Item Row */}
      <tr 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRowClick}
        style={{ 
          cursor: 'pointer',
          backgroundColor: isSelected ? colors.selectedColor : (isHovered ? colors.hoverColor : 'transparent'),
          transition: 'background-color 0.15s ease-in-out'
        }}
      >
        {/* Column cells */}
        {columns.map((column, colIndex) => {
          const cellValue = item[column.name] !== undefined ? item[column.name] : '';
          const isFirstColumn = colIndex === 0;
          
          return (
            <td 
              key={`${rowId}-${column.name}`}
              style={{
                padding: '8px 12px',
                borderBottom: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb',
                textAlign: column.align || 'left',
                ...(column.width ? { width: column.width } : {})
              }}
            >
              {isFirstColumn ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: indentPadding 
                }}>
                  {renderCaret()}
                  <span style={{ marginLeft: '8px' }}>{cellValue}</span>
                </div>
              ) : (
                cellValue
              )}
            </td>
          );
        })}
      </tr>
      
      {/* Render Children if Expanded */}
      {hasChildren && isExpanded && (
        <>
          {item.children.map((child, index) => (
            <GenericTableHierarchyRow
              key={`${child[uniqueKey] || index}`}
              item={child}
              level={level + 1}
              columns={columns}
              onRowClick={onRowClick}
              colors={colors}
              uniqueKey={uniqueKey}
              selectedRow={selectedRow}
              dataKey={dataKey}
              highlightKey={highlightKey}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
            />
          ))}
        </>
      )}
    </>
  );
};

/**
 * GenericTableHierarchy - A component for displaying hierarchical data in a simple table format
 * with expandable rows and row selection.
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - The ID used to identify this component
 * @param {Array} props.data - Array of data items with optional children arrays
 * @param {Array} props.columns - Array of column definitions with name properties
 * @param {Object} props.colors - Custom colors for hover and selection states
 * @param {string} props.uniqueKey - Property name to use as unique identifier for rows
 * @param {Object} props.selectedRow - Currently selected row data
 * @param {string} props.dataKey - Key to use when comparing selected row with current row
 * @param {string} props.highlightKey - Optional secondary key to check for highlighting
 * @param {Object} props.style - Custom styles to apply to the container
 * @param {string} props.className - CSS class names to apply to the container
 * @param {Function} props.setProps - Callback to update props
 * @returns {React.ReactNode} - Rendered hierarchical table component
 */
const GenericTableHierarchy = (props) => {
  const { 
    id,
    data = [],
    columns = [],
    colors = { hoverColor: '#f5f5f5', selectedColor: '#e6f7ff' },
    uniqueKey = 'id',
    selectedRow = null,
    dataKey = uniqueKey,
    highlightKey = null,
    style = {},
    className = '',
    setProps
  } = props;

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState({});
  
  // Reference to data for comparison
  const prevDataRef = useRef();
  
  // Reset expanded rows when data changes structure
  useEffect(() => {
    // Skip on first render
    if (prevDataRef.current) {
      // Check if data reference has changed
      if (prevDataRef.current !== data) {
        // Reset expanded rows state
        setExpandedRows({});
      }
    }
    
    // Update the ref to current data
    prevDataRef.current = data;
  }, [data]);

  // Handle row click
  const handleRowClick = (item) => {
    if (setProps) {
      // Update the selectedRow property
      setProps({ selectedRow: { ...item } });
    }
  };

  return (
    <div 
      id={id}
      className={className}
      style={{
        width: '100%',
        overflow: 'auto',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        ...style
      }}
    >
      <table 
        style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          border: '1px solid #e5e7eb',
          borderRight: 'none', // Prevents double borders
          borderBottom: 'none' // Prevents double borders
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.name}
                title={column.tooltipText || ''}
                style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  fontWeight: '600',
                  textAlign: column.align || 'left',
                  borderBottom: '2px solid #e5e7eb',
                  borderRight: 'var(--is-last-column, 1px solid #e5e7eb)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  ...(column.width ? { width: column.width } : {})
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: column.align === 'right' ? 'flex-end' : 
                                 column.align === 'center' ? 'center' : 'flex-start'
                }}>
                  {column.label || column.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <GenericTableHierarchyRow
              key={`${item[uniqueKey] || index}`}
              item={item}
              level={0}
              columns={columns}
              onRowClick={handleRowClick}
              colors={colors}
              uniqueKey={uniqueKey}
              selectedRow={selectedRow}
              dataKey={dataKey}
              highlightKey={highlightKey}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
            />
          ))}
          {data.length === 0 && (
            <tr>
              <td 
                colSpan={columns.length}
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  color: '#6b7280'
                }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * PropTypes for the GenericTableHierarchy component
 */
GenericTableHierarchy.propTypes = {
  /**
   * The ID used to identify this component.
   */
  id: PropTypes.string,

  /**
   * The hierarchical data to display.
   * Each item should have arbitrary properties and an optional children array.
   */
  data: PropTypes.array,

  /**
   * Array of column definitions that specify which fields to display.
   * Each column should have a name property, and can optionally have width, label, and align.
   * Example: [{ name: 'title', label: 'Title', width: '200px', align: 'left' }]
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    tooltipText: PropTypes.string
  })),

  /**
   * Color configuration for hover and selected states.
   */
  colors: PropTypes.shape({
    hoverColor: PropTypes.string,
    selectedColor: PropTypes.string
  }),

  /**
   * Property name in data items to use as unique identifier.
   * Default is 'id'.
   */
  uniqueKey: PropTypes.string,

  /**
   * Currently selected row data.
   */
  selectedRow: PropTypes.object,

  /**
   * Property name to use when comparing selected row with current row.
   * Default is the same as uniqueKey.
   */
  dataKey: PropTypes.string,

  /**
   * Optional secondary property to check when determining if a row should be highlighted.
   */
  highlightKey: PropTypes.string,

  /**
   * Inline styles to apply to the container.
   */
  style: PropTypes.object,

  /**
   * CSS class names to apply to the container.
   */
  className: PropTypes.string,

  /**
   * Callback that should be called to report property changes.
   */
  setProps: PropTypes.func
};

/**
 * Default properties for the GenericTableHierarchy component.
 */
GenericTableHierarchy.defaultProps = {
  data: [],
  columns: [],
  colors: { hoverColor: '#f5f5f5', selectedColor: '#e6f7ff' },
  uniqueKey: 'id',
  selectedRow: null,
  dataKey: 'id',
  style: {},
  className: ''
};

export default GenericTableHierarchy;