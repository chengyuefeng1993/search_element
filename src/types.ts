import type { InjectionKey } from 'vue'

export type Stage = {
  auditSkipCount: number
  auditWaitForMarkCount: number
  dataSourceId: number
  finishedCount: number
  markingCount: number
  markingHandlingCount: number
  markingSkipCount: number
  totalCount: number
  unAuditCount: number
  waitForMarkCount: number
}

export type Tag = {
  clearCount: number
  firstAuditCorrectCount: number
  firstAuditCorrectRatio: string
  firstAuditTotalCount: number
  statisticMarkedCount: number
  statisticTime: number
  totalMarkedCount: number
  userName: string
}

export type Skip = {
  userName: string
  count: number
}

export type Review = {
  allowNineRectGrid: boolean
  allowUserInputText: number
  data: Array<DataType>
  dataAccessWay?: string
  dataType: string
  fullscreenShortKey: string
  isSingleSelection: boolean
  pageNo: number
  pageSize: number
  selectionType: number
  singleDataCount: number
  totalSize: number
}
export type DataType = {
  answers: Array<Answers>
  caption: string
  dataId: number
  defaultCategory: string
  isAtlas: boolean
  itemVoList: Array<any>
  mediaEntityGroupList: Array<any>
  name: string
  reviewHistoryList: Array<string>
  reviewUser: string
}

export type Answers = {
  allowUserInputText: number
  answerGroup: string
  answerName: string
  filedShowMap: object
  hasDefaultOption: number
  historyList: Array<string>
  historyVoList: Array<string>
  isSingleSelection: string
  itemShowType: string
  items: Array<object>
  resultLevelType: string
  reviewDisplay: Array<string>
  selectedItemIds: Array<string>
}

export type Filter = {
  label?: string
  value?: string
}

export const key = Symbol() as InjectionKey<Function>
