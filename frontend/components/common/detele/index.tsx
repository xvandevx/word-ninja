import React from "react";
import { Button } from "@nextui-org/react";
import {Row} from "@react-stately/table";

export const DeleteUser = ({name, onDelete, onCancel}: any) => {
    return (
        <div>
            <div>
                <div>
                    Delete {name}?
                </div>
                    <Button size="sm" onClick={() => {onCancel()}}>
                        Cancel
                    </Button>
                    <Button size="sm" color="warning" onClick={() => {onDelete()}}>
                        Delete
                    </Button>
            </div>
        </div>
    );
};