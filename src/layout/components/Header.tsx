interface HeaderProps {
  title: string;
  content: string;
}

export const Header = ({ title, content }: HeaderProps) => {
  return (
    <div className="h-[90px] w-full px-4 py-4">
      <div className="text-center text-black text-xl font-pridi-medium">{title}</div>
      <div
        className="text-center text-[#2b2b2b] text-xs font-normal font-pridi"
        style={{ whiteSpace: 'pre-line' }}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
      />
    </div>
  );
};
