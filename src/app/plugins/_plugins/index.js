import React from "react";

import { RajaOngkir } from "./raja_ongkir";
import { RajaOngkir as RA2 } from "./raja_ongkir2";

import rajaOngkirLogo from "./logo/rajaongkir.svg";

export const _plugins = {
  "anphene.shipping.raja_ongkir": {
    logo: rajaOngkirLogo,
    component: <RajaOngkir />,
  },
  "anphene.shipping.raja_ongkir2": {
    logo: rajaOngkirLogo,
    component: <RA2 />,
  },
};
