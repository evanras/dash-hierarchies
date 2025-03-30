import dash_hierarchies
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

data=[
    {
        "id": 1,
        "name": "Lags",
        "percentage": 42,
        "children": [
            {
                "id": 2,
                "name": "Lag1",
                "percentage": 22,
                "children": [
                    {
                        "id": 3,
                        "name": "Lags3",
                        "percentage": 2,
                        "children": None
                    },
                    {
                        "id": 6,
                        "name": "Lags4",
                        "percentage": 52,
                        "children": [
                            {
                                "id": 8,
                                "name": "Child Lags",
                                "percentage": 23,
                                "children": None
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "name": "Lags5",
                        "percentage": 49,
                        "children": None
                    }
                ]  
            }
        ]
    },
    {
        "id": 4,
        "name": "Events",
        "percentage": 68,
        "children": None
    },
    {
        "id": 10,
        "name": "Dates",
        "percentage": 68,
        "children": [
            {
                "id": 11,
                "name": "Day of Week",
                "percentage": 13,
                "children": None
            }
        ]
    }
]

app.layout = html.Div([
    dash_hierarchies.SimpleHierarchy(
        id='hierarchy-example',
        data=data,
        colors={
            "primary": "#7c3aed",
            "background": "#e5e7eb"
        },
        styles={
            "maxWidth": "900px", "height": "300px", "overflow": "scroll"
        }
    ),
    html.Div(id='selected-item-output')
])

@callback(
    Output('selected-item-output', 'children'),
    Input('hierarchy-example', 'selectedItem')
)
def display_selected_item(selected_item):
    print(f"callback triggered: {selected_item}")
    if selected_item:
        return f"Selected item: {selected_item}"
    return "No item selected"


if __name__ == '__main__':
    app.run(debug=True)
