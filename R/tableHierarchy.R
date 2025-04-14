# AUTO GENERATED FILE - DO NOT EDIT

#' @export
tableHierarchy <- function(id=NULL, className=NULL, columns=NULL, data=NULL, indexColumnName=NULL, indexColumnWidth=NULL, selectedColumn=NULL, selectedColumnHierarchy=NULL, selectedItem=NULL, style=NULL) {
    
    props <- list(id=id, className=className, columns=columns, data=data, indexColumnName=indexColumnName, indexColumnWidth=indexColumnWidth, selectedColumn=selectedColumn, selectedColumnHierarchy=selectedColumnHierarchy, selectedItem=selectedItem, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TableHierarchy',
        namespace = 'dash_hierarchies',
        propNames = c('id', 'className', 'columns', 'data', 'indexColumnName', 'indexColumnWidth', 'selectedColumn', 'selectedColumnHierarchy', 'selectedItem', 'style'),
        package = 'dashHierarchies'
        )

    structure(component, class = c('dash_component', 'list'))
}
