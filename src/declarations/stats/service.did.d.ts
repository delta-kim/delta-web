import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Balance = bigint;
export type CanisterId = string;
export type CountryCode = string;
export type DID = string;
export type Days = bigint;
export type DaysCountItems = Array<{ 'val' : bigint, 'name' : string }>;
export interface IdentityToken { 'did' : DID, 'token' : Token }
export interface Main {
  'addCoreMember' : ActorMethod<
    [MemberInfo, CanisterId, IdentityToken],
    boolean
  >,
  'addMemberGroup' : ActorMethod<[string], boolean>,
  'countByCountry' : ActorMethod<[string], Array<[CountryCode, bigint]>>,
  'countByDays' : ActorMethod<
    [bigint, bigint],
    Array<[bigint, DaysCountItems]>
  >,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'delMemberGroup' : ActorMethod<[string], boolean>,
  'getByCountry' : ActorMethod<[CountryCode, string], bigint>,
  'getTop100IncomeUSCT' : ActorMethod<[], Array<[DID, Balance]>>,
  'listCoreMember' : ActorMethod<[], Array<MemberInfoArgs>>,
  'listMemberGroup' : ActorMethod<[], Array<string>>,
  'modifyCoreMember' : ActorMethod<
    [bigint, MemberInfo, CanisterId, IdentityToken],
    boolean
  >,
  'moveIndexCoreMember' : ActorMethod<
    [bigint, bigint, CanisterId, IdentityToken],
    boolean
  >,
  'registerOne2' : ActorMethod<[CountryCode, bigint], undefined>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'update' : ActorMethod<
    [Array<[Days, bigint]>, Array<[DID, Balance]>],
    boolean
  >,
}
export interface MemberInfo {
  'title' : string,
  'name' : string,
  'detail' : string,
  'group' : Array<string>,
  'pages' : Array<[string, string]>,
  'photo' : string,
}
export interface MemberInfoArgs {
  'id' : bigint,
  'title' : string,
  'name' : string,
  'detail' : string,
  'group' : Array<string>,
  'pages' : Array<[string, string]>,
  'photo' : string,
}
export type Token = string;
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
