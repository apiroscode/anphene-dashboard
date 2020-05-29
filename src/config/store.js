import { createStore } from "easy-peasy";

import { app, auth } from "@/core/app/store";

export const store = createStore({ app, auth });
