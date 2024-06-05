const Views = () => {
  return (
    <>
      <div className="container mx-auto hidden xl:block">
        <h2 className="text-primary text-4xl font-secondary uppercase mx-10 mt-10">
          Mesmerising views you can’t ignore
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mt-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <img src="/assets/view1.png" alt="" className="w-full" />
          </div>

          <div className="col-span-1">
            <img src="/assets/view2.png" alt="" className="w-full" />
          </div>

          <div className="col-span-1">
            <img src="/assets/view3.png" alt="" className="w-full" />
          </div>

          <div className="col-span-1">
            <img src="/assets/view4.png" alt="" className="w-full" />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <img src="/assets/view5.png" alt="" className="w-full" />
          </div>

          <div className="col-span-1">
            <img src="/assets/view6.png" alt="" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Views;
