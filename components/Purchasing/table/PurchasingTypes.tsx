import { LogisticsSelectPlainField } from '@components/general/form/LogisticsSelectPlainField';
import { SelectFieldCategory, SelectObject } from '@components/general/form/SelectField';
import { TextField } from '@components/general/form/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SupplierData {
  supplierName: string;
  itemNames: string[];
}

export interface PurchaseItemLogRevision {
  projectNumber: string;
  category: string;
  itemName: string;
  qty: string;
  unit: string;
  deliveryTerm?: string;
  eta?: Date;
  sentTo?: string;
  prItemLogId?: number;
  itemLogId?: number;
  date?: string;
  supplier?: SelectObject[];
}

export interface PurchasingRevisionChoices {
  PilihanDeliveryTerm: string[];
  PilihanTujuan: SelectObject[];
}

export const DummySupplierData: SupplierData[] = [
  {
    supplierName: 'Supp ABCD',
    itemNames: ['Pipa A', 'Pipa B', 'Pipa C', 'Pipa D'],
  },
  {
    supplierName: 'Supp EFGH',
    itemNames: ['Pipa E', 'Pipa F', 'Pipa G', 'Pipa H'],
  },
  {
    supplierName: 'Supp IJKL',
    itemNames: ['Pipa I', 'Pipa J', 'Pipa K', 'Pipa L'],
  },
];
export const DummyPurchaseItemLogRevision: PurchaseItemLogRevision[] = [
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa A',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa B',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa C',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa D',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa E',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa F',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa G',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa H',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa I',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa J',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa K',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa L',
    qty: '20',
    unit: 'Mtr',
  },
];

const DummyPRItemLog: PurchaseItemLogRevision[] = [
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa A',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa A',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa F',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa L',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa D',
    qty: '20',
    unit: 'Mtr',
  },
  {
    projectNumber: '123',
    category: 'Pipes',
    itemName: 'Pipa J',
    qty: '20',
    unit: 'Mtr',
  },
];
