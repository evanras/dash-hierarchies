# AUTO GENERATED FILE - DO NOT EDIT

#' @export
genericTableHierarchy <- function(id=NULL, className=NULL, colors=NULL, columns=NULL, data=NULL, dataKey=NULL, highlightKey=NULL, selectedRow=NULL, style=NULL, uniqueKey=NULL) {
    
    props <- list(id=id, className=className, colors=colors, columns=columns, data=data, dataKey=dataKey, highlightKey=highlightKey, selectedRow=selectedRow, style=style, uniqueKey=uniqueKey)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'GenericTableHierarchy',
        namespace = 'dash_hierarchies',
        propNames = c('id', 'className', 'colors', 'columns', 'data', 'dataKey', 'highlightKey', 'selectedRow', 'style', 'uniqueKey'),
        package = 'dashHierarchies'
        )

    structure(component, class = c('dash_component', 'list'))
}
