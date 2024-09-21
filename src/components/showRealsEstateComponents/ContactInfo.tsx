const ContactInfo = ({ icon, contact }: { icon: string; contact: string }) => {
  return (
    <div className="w-full flex justify-start items-center gap-2">
      <img src={icon} alt="contact-icon" className="w-[16px] h-[13px]" />
      <p className="leading-[16.8px] text-[14px] font-firago font-[400] text-[#808A93]">
        {contact}
      </p>
    </div>
  );
};

export default ContactInfo;
