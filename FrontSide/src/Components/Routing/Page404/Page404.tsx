import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
			<iframe
                width="853"
                height="480"
                src={`https://youtube.com/embed/t3otBjVZzT0?controls=0&loop=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Class 132" />
        </div>
    );
}

export default Page404;
