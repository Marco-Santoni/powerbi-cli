/*
 * Copyright (c) 2020 Jan Pieter Posthuma / DataScenarios
 *
 * All rights reserved.
 *
 * MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { ModuleCommand } from "../lib/command";
import { listshowAction } from "./listshow";
import { deleteAction } from "./delete";
import { upstreamAction } from "./upstream";
import { datasourceAction } from "./datasource";

export function getCommands(): ModuleCommand {
    const datasourceCommand = new ModuleCommand("datasource")
        .description("Get the datasources of a Power BI dataflow")
        .action(datasourceAction)
        .option("--group -g <name>", "Name or ID of the Power BI group.")
        .option("--dataflow -f <dataflow>", "Name or ID of the Power BI dataflow");
    datasourceCommand.addGlobalOptions();
    const deleteCommand = new ModuleCommand("delete")
        .description("Deletes a Power BI dataflow from a group")
        .action(deleteAction)
        .option("--group -g <name>", "Name or ID of the Power BI group. If not provided it uses 'My workspace'")
        .option("--dataflow -f <dataflow>", "Name or ID of the Power BI dataflow");
    deleteCommand.addGlobalOptions();
    const listCommand = new ModuleCommand("list")
        .action(listshowAction)
        .description("List Power BI dataflows in a group")
        .option("--group -g <name>", "Name or ID of the Power BI group.");
    listCommand.addGlobalOptions();
    const showCommand = new ModuleCommand("show")
        .description("Get the details of a Power BI dataflow")
        .action(listshowAction)
        .option("--group -g <name>", "Name or ID of the Power BI group.")
        .option("--dataflow -f <dataflow>", "Name or ID of the Power BI dataflow");
    showCommand.addGlobalOptions();
    const upstreamCommand = new ModuleCommand("upstream")
        .description("Get the upstream dataflows of a Power BI dataflow")
        .action(upstreamAction)
        .option("--group -g <name>", "Name or ID of the Power BI group.")
        .option("--dataflow -f <dataflow>", "Name or ID of the Power BI dataflow");
    upstreamCommand.addGlobalOptions();
    const appCommand = new ModuleCommand("dataflow")
        .description("Manage Power BI dataflows")
        .addCommand(datasourceCommand)
        .addCommand(deleteCommand)
        .addCommand(listCommand)
        .addCommand(showCommand)
        .addCommand(upstreamCommand);
    appCommand.addGlobalOptions();
    return appCommand;
}