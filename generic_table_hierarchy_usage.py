from dash import Dash, html, Input, Output
import dash_hierarchies 

app = Dash(__name__)

# Example hierarchical data
data = [
    {
        "id": "1",
        "name": "Parent 1",
        "value": 100,
        "status": "Active",
        "children": [
            {
                "id": "1-1",
                "name": "Child 1-1",
                "value": 40,
                "status": "Active"
            },
            {
                "id": "1-2",
                "name": "Child 1-2",
                "value": 60,
                "status": "Inactive",
                "children": [
                    {
                        "id": "1-2-1",
                        "name": "Grandchild 1-2-1",
                        "value": 30,
                        "status": "Active"
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "name": "Parent 2",
        "value": 200,
        "status": "Inactive"
    }
]

app.layout = html.Div([
    dash_hierarchies.GenericTableHierarchy(
        id='hierarchical-table',
        data=data,
        columns=[
            {"name": "name", "label": "Name", "width": "150px"},
            {"name": "value", "label": "Value", "align": "right"},
            {"name": "status", "label": "Status"}
        ],
        colors={
            "hoverColor": "#f0f7ff",
            "selectedColor": "#e1f5fe"
        },
        uniqueKey="id"
    ),
    html.Div(id='selected-row-output')
])

# Callback to handle row selection
@app.callback(
    Output('selected-row-output', 'children'),
    Input('hierarchical-table', 'selectedRow')
)
def display_selected_row(selected_row):
    if selected_row:
        return f"Selected: {selected_row['name']} (ID: {selected_row['id']})"
    return "No row selected"

if __name__ == '__main__':
    app.run(debug=True)