export interface GotoNextStepper {
    onNext: () => void
    onBack?: () => void
    toStep?: (vale: string) => void;
    setData?: (value: any) => void;
}