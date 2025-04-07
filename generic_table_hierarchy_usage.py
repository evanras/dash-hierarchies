# from dash import Dash, html, Input, Output
# import dash_hierarchies 

# app = Dash(__name__)

# # Example hierarchical data
# data = [
#     {
#         "id": "1",
#         "name": "Parent 1",
#         "value": 100,
#         "status": "Active",
#         "children": [
#             {
#                 "id": "1-1",
#                 "name": "Child 1-1",
#                 "value": 40,
#                 "status": "Active"
#             },
#             {
#                 "id": "1-2",
#                 "name": "Child 1-2",
#                 "value": 60,
#                 "status": "Inactive",
#                 "children": [
#                     {
#                         "id": "1-2-1",
#                         "name": "Grandchild 1-2-1",
#                         "value": 30,
#                         "status": "Active"
#                     }
#                 ]
#             }
#         ]
#     },
#     {
#         "id": "2",
#         "name": "Parent 2",
#         "value": 200,
#         "status": "Inactive"
#     }
# ]

# app.layout = html.Div([
#     dash_hierarchies.GenericTableHierarchy(
#         id='hierarchical-table',
#         data=data,
#         columns=[
#             {"name": "name", "label": "Name", "width": "150px"},
#             {"name": "value", "label": "Value", "align": "right"},
#             {"name": "status", "label": "Status"}
#         ],
#         colors={
#             "hoverColor": "#f0f7ff",
#             "selectedColor": "#e1f5fe"
#         },
#         uniqueKey="id"
#     ),
#     html.Div(id='selected-row-output')
# ])

# # Callback to handle row selection
# @app.callback(
#     Output('selected-row-output', 'children'),
#     Input('hierarchical-table', 'selectedRow')
# )
# def display_selected_row(selected_row):
#     if selected_row:
#         return f"Selected: {selected_row['name']} (ID: {selected_row['id']})"
#     return "No row selected"

# if __name__ == '__main__':
#     app.run(debug=True)

from dash import Dash, html, Input, Output, State, callback
import dash_hierarchies as dh
import json
import copy

app = Dash(__name__)

# Initial data
initial_data = [
    {
        "id": "1",
        "name": "Category A",
        "value": 500,
        "extra": "NOICE",
        "children": [
            {
                "id": "1-1",
                "name": "Subcategory A-1", 
                "value": 200,
                "extra": "NOICE",
                "children": [
                    {   
                        "id": "1-1-1",
                        "name": "Subcategory A-1-2", 
                        "value": 454,
                    }
                ]
            },
            {"id": "1-2", "name": "Subcategory A-2", "value": 300}
        ]
    },
    {
        "id": "2",
        "name": "Category B",
        "value": 750,
        "extra": "NOICE",
        "children": [
            {"id": "2-1", "name": "Subcategory B-1", "value": 400},
            {"id": "2-2", "name": "Subcategory B-2", "value": 350}
        ]
    }
]

app.layout = html.Div([
    dh.GenericTableHierarchy(
        id='table',
        data=initial_data,
        columns=[
            {"name": "name", "label": "Category", "tooltipText": "LOOK AT ME"},
            {"name": "value", "label": "Value ($)", "align": "center"},
            {"name": "extra", "label": "NOICE"}
        ],
        style={"max-width": "75%"}
    ),
    html.Div(id='selection-info'),
    html.Button('Add Subcategory', id='add-button'),
    html.Button('Remove Selected', id='remove-button', disabled=True)
])

# Enable/disable remove button based on selection
@callback(
    Output('remove-button', 'disabled'),
    Input('table', 'selectedRow')
)
def update_button_state(selected_row):
    return selected_row is None

# Display selection info
@callback(
    Output('selection-info', 'children'),
    Input('table', 'selectedRow')
)
def show_selection(selected_row):
    if not selected_row:
        return "No selection"
    
    return html.Div([
        html.H4(f"Selected: {selected_row['name']}"),
        html.Pre(json.dumps(selected_row, indent=2))
    ])

# Add new subcategory to first category
@callback(
    Output('table', 'data'),
    Input('add-button', 'n_clicks'),
    State('table', 'data'),
    prevent_initial_call=True
)
def add_subcategory(n_clicks, data):
    if not n_clicks:
        return data
    
    # Create a deep copy to avoid modifying the original
    new_data = copy.deepcopy(data)
    
    # Add new subcategory to the first category
    if new_data and new_data[0].get('children') is not None:
        new_id = f"1-{len(new_data[0]['children']) + 1}"
        new_data[0]['children'].append({
            "id": new_id,
            "name": f"Subcategory A-{len(new_data[0]['children']) + 1}",
            "value": 100
        })
    
    return new_data

# Remove selected item
@callback(
    Output('table', 'data', allow_duplicate=True),
    Output('table', 'selectedRow'),
    Input('remove-button', 'n_clicks'),
    State('table', 'data'),
    State('table', 'selectedRow'),
    prevent_initial_call=True
)
def remove_selected(n_clicks, data, selected_row):
    if not n_clicks or not selected_row:
        return data, selected_row
    
    # Create a deep copy
    new_data = copy.deepcopy(data)
    selected_id = selected_row.get('id')
    
    # Recursive function to remove item with matching ID
    def remove_item(items, target_id):
        for i, item in enumerate(items):
            if item.get('id') == target_id:
                items.pop(i)
                return True
            
            if 'children' in item and item['children']:
                if remove_item(item['children'], target_id):
                    return True
        
        return False
    
    remove_item(new_data, selected_id)
    
    return new_data, None

if __name__ == '__main__':
    app.run(debug=True)