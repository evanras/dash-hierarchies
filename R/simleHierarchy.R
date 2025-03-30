# AUTO GENERATED FILE - DO NOT EDIT

#' @export
simleHierarchy <- function(id=NULL, className=NULL, colors=NULL, data=NULL, style=NULL) {
    
    props <- list(id=id, className=className, colors=colors, data=data, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SimleHierarchy',
        namespace = 'dash_hierarchies',
        propNames = c('id', 'className', 'colors', 'data', 'style'),
        package = 'dashHierarchies'
        )

    structure(component, class = c('dash_component', 'list'))
}
