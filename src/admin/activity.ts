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

import { stringify, ParsedUrlQueryInput } from "querystring";

import { ModuleCommand } from "../lib/command";
import { debug } from "../lib/logging";
import { APICall, executeAPICall } from "../lib/api";

export async function activityAction(cmd: ModuleCommand): Promise<void> {
    const options = cmd.opts();
    if (options.H) return;
    const filter = options.filter;
    const date = options.date;
    const startTime: string = options.startTime || "00:00:00";
    const endTime: string = options.endTime || "23:59:59.999";
    const token = options.continuationToken;
    if (!token && !date) {
        throw "error: missing option '--continuation-token' or '--date'";
    }
    const query: ParsedUrlQueryInput = {};
    if (date) {
        const startDate = new Date(`${date}T${(startTime + ":00:00").substr(0, 8)}Z`);
        const endDate = new Date(`${date}T${(endTime + ":00:00.000").substr(0, 12)}Z`);
        query["startDateTime"] = `'${startDate.toISOString()}'`;
        query["endDateTime"] = `'${endDate.toISOString()}'`;
    }
    if (filter) query["$filter"] = filter;
    if (token) query["continuationToken"] = token;
    debug(`Returns a list of audit activity events for a tenant`);
    const request: APICall = {
        method: "GET",
        url: `/admin/activityevents?${stringify(query)}`,
        containsValue: false,
    };
    await executeAPICall(request, cmd.outputFormat, cmd.outputFile, cmd.jmsePath);
}
