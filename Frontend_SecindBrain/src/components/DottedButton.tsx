const DottedButton: React.FC<{ onClick: () => void; loading: boolean; children: React.ReactNode; disabled?: boolean }> = ({ onClick, loading, children, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export default DottedButton;