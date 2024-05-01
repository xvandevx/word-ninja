import React from "react";
import { Button } from "@nextui-org/react";
import {Row} from "@react-stately/table";

export const DeleteUser = ({name, onDelete, onCancel}) => {
    return (
        <div

        >
            <div>
                <div>
                    Delete {name}?
                </div>

                    <Button size="sm" light onClick={() => {onCancel()}}>
                        Cancel
                    </Button>
                    <Button size="sm" shadow color="error" onClick={() => {onDelete()}}>
                        Delete
                    </Button>
            </div>
        </div>
    );
};