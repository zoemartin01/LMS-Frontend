import { WhitelistRetailerId } from "./aliases/whitelist-retailer-id";
import {WhitelistRetailerDomain} from "./whitelist-retailer-domain";

export interface WhitelistRetailer {
  id: WhitelistRetailerId,
  name: string,
  domain: WhitelistRetailerDomain,
}
