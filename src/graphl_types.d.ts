import { GraphQLResolveInfo } from 'graphql';
import { InvoiceDb, ContactDb } from './db_types';
import { GlobalContext } from './custom_types';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Contact = {
   __typename?: 'Contact',
  id: Scalars['ID'],
  name: Scalars['String'],
  street: Scalars['String'],
  postcode: Scalars['String'],
  county: Scalars['String'],
  country: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type ContactInput = {
  name: Scalars['String'],
  street: Scalars['String'],
  postcode: Scalars['String'],
  county: Scalars['String'],
  country: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type ContactsPaginated = {
   __typename?: 'ContactsPaginated',
  total: Scalars['Int'],
  items: Array<Maybe<Contact>>,
};

export type CustomerMin = {
   __typename?: 'CustomerMin',
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  invoiceNo: Scalars['String'],
  title: Scalars['String'],
  customer: CustomerMin,
  items: Array<Maybe<Item>>,
  labels?: Maybe<Array<Maybe<LabelMin>>>,
  currency: Scalars['String'],
  taxRate: Scalars['Int'],
  subtotal: Scalars['Float'],
  tax: Scalars['Float'],
  total: Scalars['Float'],
  createdAt: Scalars['String'],
  dueAt: Scalars['String'],
  issuedAt: Scalars['String'],
  status: InvoiceStatus,
  notes?: Maybe<Scalars['String']>,
};

export enum InvoiceDbKey {
  Id = 'id',
  Customer = 'customer',
  Total = 'total',
  CreatedAt = 'createdAt',
  Status = 'status'
}

export type InvoiceInput = {
  customerId: Scalars['ID'],
  invoiceNo: Scalars['String'],
  title: Scalars['String'],
  items: Array<Maybe<InvoiceItemInput>>,
  currency: Scalars['String'],
  taxRate: Scalars['Int'],
  subtotal: Scalars['Float'],
  tax: Scalars['Float'],
  total: Scalars['Float'],
  dueAtTimestamp: Scalars['String'],
  issuedAtTimestamp: Scalars['String'],
  status: InvoiceStatus,
  notes?: Maybe<Scalars['String']>,
};

export type InvoiceItemInput = {
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['Float'],
  quantity: Scalars['Int'],
};

export type InvoicesPaginated = {
   __typename?: 'InvoicesPaginated',
  total: Scalars['Int'],
  items: Array<Maybe<Invoice>>,
};

export enum InvoiceStatus {
  Draft = 'DRAFT',
  Due = 'DUE',
  PastDue = 'PAST_DUE',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Item = {
   __typename?: 'Item',
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['Float'],
  quantity: Scalars['Int'],
  discount?: Maybe<Scalars['Int']>,
};

export type LabelMin = {
   __typename?: 'LabelMin',
  name: Scalars['String'],
  color?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createContact: Contact,
  createInvoice: Invoice,
  _?: Maybe<Scalars['Boolean']>,
};


export type MutationCreateContactArgs = {
  input: ContactInput
};


export type MutationCreateInvoiceArgs = {
  input: InvoiceInput
};

export type Query = {
   __typename?: 'Query',
  getContacts: ContactsPaginated,
  getContact: Contact,
  getInvoices: InvoicesPaginated,
  getInvoice: Invoice,
  _?: Maybe<Scalars['Boolean']>,
};


export type QueryGetContactArgs = {
  id: Scalars['ID']
};


export type QueryGetInvoicesArgs = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  searchKey?: Maybe<InvoiceDbKey>,
  sortKey?: Maybe<InvoiceDbKey>,
  isDesc?: Maybe<Scalars['Boolean']>
};


export type QueryGetInvoiceArgs = {
  id: Scalars['ID']
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
  ContactsPaginated: ResolverTypeWrapper<Omit<ContactsPaginated, 'items'> & { items: Array<Maybe<ResolversTypes['Contact']>> }>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Contact: ResolverTypeWrapper<ContactDb>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  InvoiceDBKey: InvoiceDbKey,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  InvoicesPaginated: ResolverTypeWrapper<Omit<InvoicesPaginated, 'items'> & { items: Array<Maybe<ResolversTypes['Invoice']>> }>,
  Invoice: ResolverTypeWrapper<InvoiceDb>,
  CustomerMin: ResolverTypeWrapper<CustomerMin>,
  Item: ResolverTypeWrapper<Item>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  LabelMin: ResolverTypeWrapper<LabelMin>,
  InvoiceStatus: InvoiceStatus,
  Mutation: ResolverTypeWrapper<{}>,
  ContactInput: ContactInput,
  InvoiceInput: InvoiceInput,
  InvoiceItemInput: InvoiceItemInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ContactsPaginated: Omit<ContactsPaginated, 'items'> & { items: Array<Maybe<ResolversParentTypes['Contact']>> },
  Int: Scalars['Int'],
  Contact: ContactDb,
  ID: Scalars['ID'],
  String: Scalars['String'],
  InvoiceDBKey: InvoiceDbKey,
  Boolean: Scalars['Boolean'],
  InvoicesPaginated: Omit<InvoicesPaginated, 'items'> & { items: Array<Maybe<ResolversParentTypes['Invoice']>> },
  Invoice: InvoiceDb,
  CustomerMin: CustomerMin,
  Item: Item,
  Float: Scalars['Float'],
  LabelMin: LabelMin,
  InvoiceStatus: InvoiceStatus,
  Mutation: {},
  ContactInput: ContactInput,
  InvoiceInput: InvoiceInput,
  InvoiceItemInput: InvoiceItemInput,
};

export type ContactResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  postcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  county?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ContactsPaginatedResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['ContactsPaginated'] = ResolversParentTypes['ContactsPaginated']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<Maybe<ResolversTypes['Contact']>>, ParentType, ContextType>,
};

export type CustomerMinResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['CustomerMin'] = ResolversParentTypes['CustomerMin']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type InvoiceResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  invoiceNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  customer?: Resolver<ResolversTypes['CustomerMin'], ParentType, ContextType>,
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType>,
  labels?: Resolver<Maybe<Array<Maybe<ResolversTypes['LabelMin']>>>, ParentType, ContextType>,
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  taxRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  subtotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  dueAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  issuedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  status?: Resolver<ResolversTypes['InvoiceStatus'], ParentType, ContextType>,
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type InvoicesPaginatedResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['InvoicesPaginated'] = ResolversParentTypes['InvoicesPaginated']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<Maybe<ResolversTypes['Invoice']>>, ParentType, ContextType>,
};

export type ItemResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  discount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type LabelMinResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['LabelMin'] = ResolversParentTypes['LabelMin']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>,
  createInvoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'input'>>,
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = GlobalContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getContacts?: Resolver<ResolversTypes['ContactsPaginated'], ParentType, ContextType>,
  getContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<QueryGetContactArgs, 'id'>>,
  getInvoices?: Resolver<ResolversTypes['InvoicesPaginated'], ParentType, ContextType, QueryGetInvoicesArgs>,
  getInvoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<QueryGetInvoiceArgs, 'id'>>,
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = GlobalContext> = {
  Contact?: ContactResolvers<ContextType>,
  ContactsPaginated?: ContactsPaginatedResolvers<ContextType>,
  CustomerMin?: CustomerMinResolvers<ContextType>,
  Invoice?: InvoiceResolvers<ContextType>,
  InvoicesPaginated?: InvoicesPaginatedResolvers<ContextType>,
  Item?: ItemResolvers<ContextType>,
  LabelMin?: LabelMinResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = GlobalContext> = Resolvers<ContextType>;
