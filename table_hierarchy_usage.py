import dash
from dash import html, Input, Output, callback
import dash_hierarchies as dh

app = dash.Dash(__name__)

# Sample data matching the screenshot
data = [
    {
        "Forecast Decomposition": "Base Prediction",
        "January 2024": 7664.13,
        "February 2024": 6922.44,
        "March 2024": 7664.13,
        "April 2024": 7416.90,
        "May 2024": 7664.13,
        "June 2024": 7416.90,
        "children": None
    },
    {
        "Forecast Decomposition": "Periodic Prediction Explanation",
        "January 2024": -680.54,
        "February 2024": -472.21,
        "March 2024": -389.24,
        "April 2024": 8549.28,
        "May 2024": -1485.28,
        "June 2024": -249.28,
        "children": [
            {
                "Forecast Decomposition": "Some Child Item",
                "January 2024": -300.25,
                "February 2024": -200.10,
                "March 2024": -189.14,
                "April 2024": 3500.00,
                "May 2024": -585.28,
                "June 2024": -149.28,
                "children": None
            }
        ]
    },
    {
        "Forecast Decomposition": "Forecast",
        "January 2024": 6983.59,
        "February 2024": 6450.23,
        "March 2024": 7274.89,
        "April 2024": 15966.18,
        "May 2024": 6178.85,
        "June 2024": 7167.62,
        "children": [
            {
                "Forecast Decomposition": "Forecast",
                "January 2024": 6983.59,
                "February 2024": 6450.23,
                "March 2024": 7274.89,
                "April 2024": 15966.18,
                "May 2024": 6178.85,
                "June 2024": 7167.62,
                "children": [
                    {
                        "Forecast Decomposition": "Forecast",
                        "January 2024": 6983.59,
                        "February 2024": 6450.23,
                        "March 2024": 7274.89,
                        "April 2024": 15966.18,
                        "May 2024": 6178.85,
                        "June 2024": 7167.62,
                        "children": None
                    }
                ]
            },
            {
                "Forecast Decomposition": "Something",
                "January 2024": 6983.59,
                "February 2024": 6450.23,
                "March 2024": 7274.89,
                "April 2024": 15966.18,
                "May 2024": 6178.85,
                "June 2024": 7167.62,
                "children": None
            }
        ]
    }
]

# Column definitions
columns = [
    {"name": "Forecast Decomposition", "width": "250px"},
    {"name": "January 2024", "width": "150px"},
    {"name": "February 2024", "width": "150px"},
    {"name": "March 2024", "width": "150px"},
    {"name": "April 2024", "width": "150px"},
    {"name": "May 2024", "width": "150px"},
    {"name": "June 2024", "width": "150px"}
]

app.layout = html.Div([
    dh.TableHierarchy(
        id='table-hierarchy-example',
        data=data,
        columns=columns,
        indexColumnName="Forecast Decomposition",
        style={"maxHeight": "400px"},
        indexColumnWidth='300px'
    ),
    html.Div("The items below are normal callbacks built with this component."),
    html.Div(id='selected-item-output'),
    html.Div(id='selected-column-output')
])

@callback(
    Output('selected-item-output', 'children'),
    Input('table-hierarchy-example', 'selectedItem')
)
def display_selected_item(selected_item):
    if selected_item:
        return f"Selected row: {selected_item.get('Forecast Decomposition')}"
    return "No row selected"

@callback(
    Output('selected-column-output', 'children'),
    Input('table-hierarchy-example', 'selectedColumn')
)
def display_selected_column(selected_column):
    if not selected_column:
        return "No column selected"
    
    # Extract column name and data
    column_name = selected_column.get('name')
    column_data = selected_column.get('data', [])
    
    # Create a summary table
    header = html.Tr([
        html.Th("Forecast Decomposition"),
        html.Th(column_name)
    ])
    
    rows = []
    for item in column_data:
        index_value = item.get('Forecast Decomposition')
        value = item.get('value')
        rows.append(html.Tr([
            html.Td(index_value),
            html.Td(f"{value:,.2f}")
        ]))
    
    table = html.Table([header, html.Tbody(rows)])
    
    return [
        html.H4(f"Column: {column_name}"),
        table
    ]

if __name__ == '__main__':
    app.run(debug=True)