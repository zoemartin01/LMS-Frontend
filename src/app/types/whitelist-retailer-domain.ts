import {WhitelistRetailerDomainId} from "./aliases/whitelist-retailer-domain-id";

export interface WhitelistRetailerDomain {
  id: WhitelistRetailerDomainId,
  domains: string[],
}
