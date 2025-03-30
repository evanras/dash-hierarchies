import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * HierarchicalDataItem - Renders a single item in the hierarchical structure
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Item data containing name, percentage, and optional children
 * @param {number} props.level - Current nesting level for indentation
 * @param {Object} props.colors - Color configuration for bars
 * @param {React.ReactNode} props.openCaret - Icon to show when item is expanded
 * @param {React.ReactNode} props.closedCaret - Icon to show when item is collapsed
 * @param {Function} props.onRowClick - Callback function when row is clicked
 * @returns {React.ReactNode} - Rendered item with optional children
 */
const HierarchicalDataItem = ({ 
  item, 
  level = 0, 
  colors, 
  openCaret, 
  closedCaret,
  onRowClick
}) => {
  // Track expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  // Track hover state for visual feedback
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if this item has children
  const hasChildren = item.children && item.children.length > 0;
  
  // Calculate indentation based on nesting level using em instead of px
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
    <div style={{ width: '100%' }}>
      {/* Item Row */}
      <div 
        style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '0.25em',
          padding: '0.5em 0',
          backgroundColor: isHovered ? '#f9fafb' : 'transparent',
          borderRadius: '0.25em',
          cursor: 'pointer'
        }}
        onClick={handleRowClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Indentation and Toggle Button */}
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
            <div style={{ marginRight: '0.5em', width: '1.5em' }}></div> // Placeholder for alignment
          )}
          
          {/* Item Name */}
          <div style={{ 
            flexGrow: 1, 
            fontWeight: 500 
          }}>
            {item.name}
          </div>
        </div>
        
        {/* Percentage Display */}
        <div style={{ 
          marginLeft: 'auto', 
          color: '#6b7280' 
        }}>
          {item.percentage}%
        </div>
      </div>
      
      {/* Progress Bar - Now indented to match the text */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* This div creates the same indentation as the text */}
        <div style={{ width: indentPadding, flexShrink: 0 }}></div>
        
        {/* Caret width equivalent space */}
        <div style={{ width: '1.5em', flexShrink: 0 }}></div>
        
        {/* The actual progress bar */}
        <div 
          style={{ 
            flex: 1,
            height: '0.5em', 
            borderRadius: '0.25em', 
            marginBottom: '0.5em', 
            backgroundColor: colors.background 
          }}
        >
          <div 
            style={{ 
              height: '100%', 
              borderRadius: '0.25em', 
              width: `${item.percentage}%`, 
              backgroundColor: colors.primary 
            }}
          ></div>
        </div>
      </div>
      
      {/* Render Children if Expanded */}
      {hasChildren && isExpanded && (
        <div style={{ width: '100%' }}>
          {item.children.map((child, index) => (
            <HierarchicalDataItem
              key={`${child.name}-${index}`}
              item={child}
              level={level + 1}
              colors={colors}
              openCaret={openCaret}
              closedCaret={closedCaret}
              onRowClick={onRowClick} // Pass down the onRowClick prop to children
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * SimpleHierarchy - A Dash component for displaying hierarchical data with expandable sections
 * 
 * This component displays hierarchical data with collapsible sections, percentage indicators, 
 * and progress bars. It is designed to be used as a Dash component.
 *
 * @param {Object} props - Component props
 * @param {string} props.id - The ID used to identify this component in Dash callbacks
 * @param {Array} props.data - Array of data items with name, percentage, and optional children
 * @param {Object} props.colors - Colors for the progress bars
 * @param {string} props.colors.primary - Color for the filled portion of progress bars
 * @param {string} props.colors.background - Color for the unfilled portion of progress bars
 * @param {Object} props.style - Custom styles to apply to the container
 * @param {string} props.className - CSS class names to apply to the container
 * @param {string} props.selectedItem - Name of the currently selected item (for controlled component)
 * @param {Function} props.setProps - Dash callback to update props
 * @returns {React.ReactNode} - Rendered hierarchical data component
 */
const SimpleHierarchy = (props) => {
  const { 
    id,
    data = [], 
    colors = { primary: "#7c3aed", background: "#e5e7eb" },
    style = {},
    className = '',
    selectedItem = null,
    setProps
  } = props;

  // Define SVG for carets to avoid external dependencies
  // Now the openCaret points down (was pointing up before)
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
      
      // Update the selectedItem property in Dash with the modified item
      setProps({ selectedItem: itemWithoutChildren });
    }
  };

  return (
    <div 
      id={id}
      className={className} 
      style={{
        width: '100%',
        padding: '1em',
        border: '1px solid #e5e7eb',
        borderRadius: '0.25em',
        ...style
      }}
    >
      {data.map((item, index) => (
        <HierarchicalDataItem
          key={`${item.name}-${index}`}
          item={item}
          colors={colors}
          openCaret={openCaret}
          closedCaret={closedCaret}
          onRowClick={handleRowClick}
        />
      ))}
    </div>
  );
};

/**
 * PropTypes for the SimpleHierarchy component
 * These define the expected properties and their types for Dash
 */
SimpleHierarchy.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: PropTypes.string,

  /**
   * The hierarchical data to display.
   * Each item should have a name, percentage, and optional children array.
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    children: PropTypes.array
  })),

  /**
   * Colors for the component.
   */
  colors: PropTypes.shape({
    primary: PropTypes.string,
    background: PropTypes.string
  }),

  /**
   * Inline styles to apply to the outer div.
   */
  style: PropTypes.object,

  /**
   * CSS class names to apply to the outer div.
   */
  className: PropTypes.string,

  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: PropTypes.func,

  /**
   * Object representing the currently selected item (controlled component pattern).
   * This will be updated when a row is clicked.
   * Contains all properties of the selected item except the 'children' array.
   */
  selectedItem: PropTypes.object
};

/**
 * Default properties for the SimpleHierarchy component.
 */
SimpleHierarchy.defaultProps = {
  data: [],
  colors: { primary: "#7c3aed", background: "#e5e7eb" },
  style: {},
  selectedItem: null
};

export default SimpleHierarchy;