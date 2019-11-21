import { GraphQLResolveInfo } from 'graphql';
import { InvoiceDb } from './db_types';
import { GlobalContext } from './custom_types';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CustomerMin = {
   __typename?: 'CustomerMin',
  name: Scalars['String'],
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  customer: CustomerMin,
  total: Scalars['Int'],
  createdAt: Scalars['String'],
  status: InvoiceStatus,
};

export enum InvoiceStatus {
  Due = 'DUE',
  PastDue = 'PAST_DUE',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Query = {
   __typename?: 'Query',
  getInvoices: Array<Maybe<Invoice>>,
  _?: Maybe<Scalars['Boolean']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Invoice: ResolverTypeWrapper<InvoiceDb>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  CustomerMin: ResolverTypeWrapper<CustomerMin>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  InvoiceStatus: InvoiceStatus,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Invoice: InvoiceDb,
  ID: Scalars['ID'],
  CustomerMin: CustomerMin,
  String: Scalars['String'],
  Int: Scalars['Int'],
  InvoiceStatus: InvoiceStatus,
  Boolean: Scalars['Boolean'],
};

export type CustomerMinResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['CustomerMin'] = ResolversParentTypes['CustomerMin']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type InvoiceResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  customer?: Resolver<ResolversTypes['CustomerMin'], ParentType, ContextType>,
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  status?: Resolver<ResolversTypes['InvoiceStatus'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getInvoices?: Resolver<Array<Maybe<ResolversTypes['Invoice']>>, ParentType, ContextType>,
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = GlobalContext> = {
  CustomerMin?: CustomerMinResolvers<ContextType>,
  Invoice?: InvoiceResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = GlobalContext> = Resolvers<ContextType>;
