import BlueButton from "../buttons/BlueButton";

interface PaginationProps {
  page: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, first, last, onPageChange }: PaginationProps) => {
  return (
    <div className="w-full flex items-center justify-center gap-x-4">
      <BlueButton label="Previous" onClick={() => onPageChange(page - 1)} disabled={first} />

      <span className="text-sm">Page {page + 1} of {totalPages}</span>

      <BlueButton label="Next" onClick={() => onPageChange(page + 1)} disabled={last} />
    </div>
  );
};

export default Pagination;