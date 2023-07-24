
export enum TradingType {
    wholesaler = 1,
    retailer = 2
}

export enum FeeCalcType {
    Base = 1,
    Fixed = 2
}

export enum RecordStatus {
    New = 1,
    Enabled = 2,
    Disabled = 3,
    Freezed = 4,
    Deleted = 5,
    Blocked = 6
}

export enum CustomerTypes {
    Business = 1,
    Withdrawer = 2,
    PrivatePerson = 3
}

export enum LicenseTypes {
    GuaranteedChecks = 1,
    BusinessWallet = 2,
    PrivateWallet = 3,
    Rentals
}
export enum OutputType {
    Source = 1,
    Image = 2
}

export enum Departments {
    Sales = 1,
    Collection = 2
}

export enum DebtCollectionStatus {
    New = 1,
    Arrangement = 5,
    SoltToLawyer = 6,
    Closed = 7
}

export enum PhoneTypes {
    Main = 1,
    Home = 2,
    Mobile = 3,
    Work = 4
}

export enum UserValidationError {
    DuplicateUserName = 1,
    DuplicatePrivateId = 2,
    DuplicateEmail = 3,
    DuplicateUserPrivateId = 4,
    DuplicateUserEmail = 5,
}

export enum TransactionTypes {
    GuaranteedChecks = 1,
    DigitalWallet = 2,
    Rent = 3,
    Invoice = 4
}

export enum FinancialDataType {
    Business = 1,
    Withdrawer = 2,
    Bailor = 3
}

export enum TransactionStatus {
    Confirmed = 1,
    Refusal = 2,
    Pending = 3,
    RecyclingBin = 4,
    WaitForPayerAccept = 5,
    Canceled = 6,
    CanceledWithoutFee = 7,
    // InUnderwritingWorkflow = 8
}

export enum TransactionSource {
    Client = 1,
    Application = 2,
    Phone = 3,
    Retalix = 4
}

export enum StatusChangedBy {
    System = 1,
    ApprovalCenter = 2
}


export enum PaymentStatus {
    Paid = 1,
    Return = 2,
    Charged = 3,
    ReturnRisk = 4,
    future = 5
}

export enum PaymentType {
    Cash = 1,
    Deferred = 2,
    Payments = 3
}

export enum PromotionalStatus {
    EligibleForCredit = 1,
    EligibleForPartialCredit = 2,
    MovedToAccounting = 3,
    Debriefing = 4,
    DebtToTheBusiness = 5,
    TotalDisqualification = 6,
    DisqualificationAndAttemptedCollection = 7,
    CreditWasMade = 8
}

export enum NotPromotionalReason {
    ReturnFailure = 1,
    LateNotify = 2,
    InvalidStamp = 3,
    ThirdParty = 4,
    IncorrectDetails = 5,
    CancellationMessageReceived = 6,
    ClosesInBusiness = 7,
    DenialTransaction = 8,
    SuspectedStolen = 9,
    ForeignResident = 10,
    PastDebt = 11,
    Sourceless = 12
}

export enum ReturnPaymentReason {
    NoCover = 1,
    Limited = 2,
    Cancelation = 3,
    Technical = 4,
    PaymentFailure = 5
}

export enum ReturnCertificateStatuses {
    CheckWithDiscount = 1,
    BusinessWithCollectionProblem = 2,
    ConditionalTransaction = 3,
    TransactionToTracking = 4
}

export enum DebtActionType {
    IncreasingDebt = 1,
    DebtReduction = 2
}

export enum DebtTransactionType {
    InitialDebtSum = 1,
    ReceivingPayment = 2,
    LawyerFees = 3,
    CourtCosts = 4,
    LegalLetter = 5,
    AdditionalLegalExpenses = 6,
    SaleDebtToLawyer = 7,
    CollectionFee = 8
}

export enum DebtType {
    ReturnPayment = 1,
    CollectionFromBusiness = 2
}

export enum EntityType {
    Business = 1,
    BusinessBranch = 2,
    Withdrawer = 3,
    Transaction = 4,
    ReturnPaymentCertificate = 5,
    License = 6
}

export enum DocType {
    Contract = 1,
    AccountTransactionsPage = 2
}


