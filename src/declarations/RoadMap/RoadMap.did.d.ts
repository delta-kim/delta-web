import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AppIdentityTokenArgs {
  'dAppIdentToken' : IdentityToken,
  'accCanisterId' : CanisterId,
}
export type CanisterId = string;
export type DID = string;
export interface IdentityToken { 'did' : DID, 'token' : Token }
export type Index = bigint;
export interface Main {
  'addAndUpdateVote' : ActorMethod<
    [bigint, VoteMark, string, AppIdentityTokenArgs],
    [Vote, TotalVotes]
  >,
  'addRoadNode' : ActorMethod<[RoadNode], boolean>,
  'addSuggestion' : ActorMethod<
    [string, string, AppIdentityTokenArgs],
    Suggestion
  >,
  'addUpdateLog' : ActorMethod<[UpdateLogObj, [] | [bigint]], Index>,
  'changeUpdateLog' : ActorMethod<[bigint, UpdateLogObj], Index>,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'deposit_cycles' : ActorMethod<[bigint], boolean>,
  'editSuggestion' : ActorMethod<
    [bigint, string, AppIdentityTokenArgs],
    boolean
  >,
  'getMobileApplastVersion' : ActorMethod<
    [MobileAppType],
    MobileApplastVersion
  >,
  'getSuggestion' : ActorMethod<[bigint], Suggestion>,
  'init' : ActorMethod<[], undefined>,
  'listHot30Sugg' : ActorMethod<[], Array<Suggestion>>,
  'listRoadNodes' : ActorMethod<[], Array<RoadNode>>,
  'listSuggestion' : ActorMethod<[bigint], Array<Suggestion>>,
  'listUpdateLog' : ActorMethod<[bigint], Array<UpdateLogObj>>,
  'listVote' : ActorMethod<[bigint, bigint], Array<Vote>>,
  'myVote' : ActorMethod<[bigint, AppIdentityTokenArgs], [] | [VoteSB]>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'updateMobileApplastVersion' : ActorMethod<
    [Array<MobileApplastVersion>],
    boolean
  >,
}
export type MobileAppType = { 'ios' : null } |
  { 'android' : null };
export type MobileApplastVersion = {
    'ios' : { 'version' : string, 'store' : string, 'notes' : string }
  } |
  {
    'android' : {
      'apk' : string,
      'version' : string,
      'store' : string,
      'notes' : string,
    }
  };
export type Nickname = string;
export interface RoadNode {
  'id' : bigint,
  'status' : Status,
  'suggestionId' : Array<bigint>,
  'title' : string,
  'content' : string,
  'updateLogId' : Array<bigint>,
  'progressLine' : Array<[Status, Timestamp]>,
}
export type Status = { 'completed' : null } |
  { 'queuing' : null } |
  { 'processing' : null };
export interface Suggestion {
  'did' : DID,
  'title' : string,
  'content' : string,
  'nickname' : Nickname,
  'totalVotes' : TotalVotes,
  'adoptedRoadNodeId' : [] | [bigint],
  'timestamp' : Timestamp,
  'index' : bigint,
}
export type Timestamp = bigint;
export type Token = string;
export interface TotalVotes { 'no' : bigint, 'yes' : bigint }
export type UpdateLog = { 'DSMSAccessTerminal' : string } |
  { 'Website' : string } |
  { 'MobileApp' : string } |
  { 'SmartContract' : string } |
  { 'Other' : string };
export interface UpdateLogObj {
  'id' : bigint,
  'suggestionId' : Array<bigint>,
  'logs' : Array<UpdateLog>,
  'time' : Timestamp,
}
export interface Vote {
  'did' : DID,
  'content' : string,
  'mark' : VoteMark,
  'timestamp' : Timestamp,
}
export type VoteMark = { 'no' : null } |
  { 'yes' : null };
export interface VoteSB {
  'content' : string,
  'mark' : VoteMark,
  'timestamp' : Timestamp,
}
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
