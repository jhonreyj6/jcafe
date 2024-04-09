<template>
    <div>
        <div class="mb-150">
            <div
                id="carouselintro"
                class="carousel slide"
                data-bs-ride="carousel"
            >
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselintro"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselintro"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselintro"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src="/img/car1.jpg"
                            class="d-block w-100"
                            alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>
                                Some representative placeholder content for the
                                first slide.
                            </p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img
                            src="/img/car2.jpg"
                            class="d-block w-100"
                            alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>
                                Some representative placeholder content for the
                                second slide.
                            </p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img
                            src="/img/car3.jpg"
                            class="d-block w-100"
                            alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>
                                Some representative placeholder content for the
                                third slide.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselintro"
                    data-bs-slide="prev"
                >
                    <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselintro"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="container-lg container-md-fluid">
                <div class="d-flex flex-column flex-md-row">
                    <div
                        class="p-4 bg-info flex-fill text-white text-center w-100"
                    >
                        <div class="card">
                            <div class="card-header">
                                <i
                                    class="fa fa-keyboard-o text-primary"
                                    style="font-size: 100px"
                                ></i>
                            </div>
                            <div class="card-body">
                                Ut Lorem eiusmod aliquip deserunt proident
                                mollit. Ipsum tempor ad ea reprehenderit qui
                                amet occaecat adipisicing veniam fugiat.
                                Consectetur esse deserunt in amet minim
                                reprehenderit Lorem non. Incididunt in veniam
                                irure ipsum eu Lorem consectetur mollit
                                consequat. Dolore duis id id Lorem est enim do
                                pariatur cillum nulla nostrud ex laboris.
                                Consectetur cillum labore proident excepteur
                                nisi sint proident adipisicing nostrud. Enim
                                deserunt proident proident sit.s
                            </div>
                            <div class="card-footer">
                                <div class="btn btn-primary">Browse Games</div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="p-4 bg-primary flex-fill text-white text-center w-100"
                    >
                        <div class="card">
                            <div class="card-header">
                                <i
                                    class="fa fa-coffee text-primary"
                                    style="font-size: 100px"
                                ></i>
                            </div>
                            <div class="card-body">
                                Ut Lorem eiusmod aliquip deserunt proident
                                mollit. Ipsum tempor ad ea reprehenderit qui
                                amet occaecat adipisicing veniam fugiat.
                                Consectetur esse deserunt in amet minim
                                reprehenderit Lorem non. Incididunt in veniam
                                irure ipsum eu Lorem consectetur mollit
                                consequat. Dolore duis id id Lorem est enim do
                                pariatur cillum nulla nostrud ex laboris.
                                Consectetur cillum labore proident excepteur
                                nisi sint proident adipisicing nostrud. Enim
                                deserunt proident proident sit.
                            </div>
                            <div class="card-footer">
                                <div class="btn btn-info text-white">
                                    Order Food
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="p-4 bg-info flex-fill text-white text-center w-100"
                    >
                        <div class="card">
                            <div class="card-header">
                                <i
                                    class="fa fa-print text-primary"
                                    style="font-size: 100px"
                                ></i>
                            </div>
                            <div class="card-body">
                                Ut Lorem eiusmod aliquip deserunt proident
                                mollit. Ipsum tempor ad ea reprehenderit qui
                                amet occaecat adipisicing veniam fugiat.
                                Consectetur esse deserunt in amet minim
                                reprehenderit Lorem non. Incididunt in veniam
                                irure ipsum eu Lorem consectetur mollit
                                consequat. Dolore duis id id Lorem est enim do
                                pariatur cillum nulla nostrud ex laboris.
                                Consectetur cillum labore proident excepteur
                                nisi sint proident adipisicing nostrud. Enim
                                deserunt proident proident sit.
                            </div>
                            <div class="card-footer">
                                <div class="btn btn-primary px-4">Print</div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <br />
                <h3 class="text-center">Our Shop Location</h3>

                <div class="card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-6">
                            <img
                                src="/img/GoogleMapTA.webp"
                                class="img"
                                alt=""
                            />
                        </div>
                        <div class="col-md-6">
                            <div class="text-center mt-4">
                                <h3>Lapu-lapu, San Pedro</h3>
                            </div>
                            <div class="text-center mt-4">
                                Consequat non sunt dolor eiusmod consequat.
                                Deserunt nulla excepteur culpa esse excepteur id
                                cupidatat mollit. Est nulla non occaecat veniam.
                                Qui culpa id laboris fugiat enim. Fugiat in qui
                                voluptate laborum et do amet consectetur tempor
                                commodo nisi. Fugiat magna deserunt adipisicing
                                irure esse eu consequat duis cillum fugiat
                                commodo ex sit. Eiusmod ipsum in amet sunt quis
                                officia quis officia reprehenderit nisi.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-6">
                            <img
                                src="/img/GoogleMapTA.webp"
                                class="img"
                                alt=""
                            />
                        </div>
                        <div class="col-md-6">
                            <div class="text-center mt-4">
                                <h3>Bangus,San Pedro</h3>
                            </div>
                            <div class="text-center mt-4">
                                Consequat non sunt dolor eiusmod consequat.
                                Deserunt nulla excepteur culpa esse excepteur id
                                cupidatat mollit. Est nulla non occaecat veniam.
                                Qui culpa id laboris fugiat enim. Fugiat in qui
                                voluptate laborum et do amet consectetur tempor
                                commodo nisi. Fugiat magna deserunt adipisicing
                                irure esse eu consequat duis cillum fugiat
                                commodo ex sit. Eiusmod ipsum in amet sunt quis
                                officia quis officia reprehenderit nisi.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-6">
                            <img
                                src="/img/GoogleMapTA.webp"
                                class="img"
                                alt=""
                            />
                        </div>
                        <div class="col-md-6">
                            <div class="text-center mt-4">
                                <h3>Bagdhad, San Vicente</h3>
                            </div>
                            <div class="text-center mt-4">
                                Consequat non sunt dolor eiusmod consequat.
                                Deserunt nulla excepteur culpa esse excepteur id
                                cupidatat mollit. Est nulla non occaecat veniam.
                                Qui culpa id laboris fugiat enim. Fugiat in qui
                                voluptate laborum et do amet consectetur tempor
                                commodo nisi. Fugiat magna deserunt adipisicing
                                irure esse eu consequat duis cillum fugiat
                                commodo ex sit. Eiusmod ipsum in amet sunt quis
                                officia quis officia reprehenderit nisi.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <h3>Our PC Setup</h3>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 5 5600</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m MSI</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 5 5500</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Gigabyte</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: BenQ 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">I3 9100F</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m MSI</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 5 3400G</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Asus</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 5 2400G</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Asus</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 3 3200G</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Asus</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Ryzen 5 2200G</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Asus</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 mt-4">
                        <div class="card">
                            <div class="card">
                                <img
                                    class="card-img-top img"
                                    src="/img/pcbundle.jpg"
                                    alt="pcbundle"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Athlon 3000G</h5>
                                    <div class="card-text mb-2">
                                        <div>Motherboard: A320m Asus</div>
                                        <div>Ram: 2x8gb DDR4 3200mhz</div>
                                        <div>Monitor: Lenovo 24" IPS</div>
                                    </div>
                                    <a href="#" class="btn btn-primary"
                                        >Details</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-5">
                <div class="row mb-4">
                    <div class="col-md-12 text-center">
                        <div class="lc-block mb-4">
                            <h2 editable="inline" class="rfs-25 fw-bolder">
                                Customer's Review
                            </h2>
                            <p editable="inline">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc et metus id<br />
                                ligula malesuada placerat sit amet quis enim.
                            </p>
                        </div>
                        <!-- /lc-block -->
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Nicolas Horn"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1527980965255-d3b416303d12??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1527980965255-d3b416303d12??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1527980965255-d3b416303d12??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1527980965255-d3b416303d12??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Mathew Glock
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Leio McLaren"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1628157588553-5eeea00af15c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1628157588553-5eeea00af15c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1628157588553-5eeea00af15c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1628157588553-5eeea00af15c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NHx8YXZhdGFyfGVufDB8Mnx8fDE2Mzg4OTExNTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Tahmid William&nbsp;
                                            <p></p>
                                            <p></p>
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Nunc et
                                            metus id ligula malesuada placerat
                                            sit amet quis enim. Aliquam erat
                                            volutpat.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3 text-success">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Amir Seilsepour"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fGZhY2V8ZW58MHwyfHx8MTYzODg5MTA3MA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Jarvis Ridley&nbsp;
                                            <p></p>
                                            <p></p>
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3 text-success">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Imansyah Muhamad Putera"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1542909168-82c3e7fdca5c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1542909168-82c3e7fdca5c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1542909168-82c3e7fdca5c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1542909168-82c3e7fdca5c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Bronwen Baxter&nbsp;
                                            <p></p>
                                            <p></p>
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3 text-success">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Conor OBrien"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Nadir Chandler
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Nunc et
                                            metus id ligula malesuada placerat
                                            sit amet quis enim. Aliquam erat
                                            volutpat.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3 text-success">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4 mb-4">
                        <div class="card border-0 shadow">
                            <div class="card-body py-4">
                                <div class="d-flex">
                                    <img
                                        style="width: 48px; height: 48px"
                                        src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080"
                                        alt="Photo by Daniil Lobachev"
                                        class="rounded-2 shadow"
                                        srcset="
                                            https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=1080 1080w,
                                            https://images.unsplash.com/photo-1584308972272-9e4e7685e80f??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150             150w,
                                            https://images.unsplash.com/photo-1584308972272-9e4e7685e80f??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300             300w,
                                            https://images.unsplash.com/photo-1584308972272-9e4e7685e80f??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768             768w,
                                            https://images.unsplash.com/photo-1584308972272-9e4e7685e80f??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8Nnx8ZmFjZXxlbnwwfDJ8fHwxNjM4ODkxMDU2&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024           1024w
                                        "
                                        sizes="(max-width: 1080px) 100vw, 1080px"
                                        width="1080"
                                        height="1080"
                                    />
                                    <div class="ps-2">
                                        <h4
                                            editable="inline"
                                            class="rfs-7 ms-2"
                                        >
                                            Samira Goldsmith
                                        </h4>
                                    </div>
                                </div>
                                <div class="lc-block mt-4 text-muted">
                                    <div class="review-message">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="rating mt-3 text-success">
                                    <div class="lc-block">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },

    name: "IntroComponent",

    components: {},

    props: {},

    computed: {},
};
</script>

<style scoped>
#carouselintro img {
    height: 600px;
}

.card-text {
    height: 90px;
    overflow-y: hidden;
}

.fa-star {
    color: #dde016;
}

.review-message {
    height: 100px;
    text-overflow: ellipsis;
    overflow-y: hidden;
}

#carouselintro {
    margin-top: 26px;
}

.card-img-top {
    height: 300px;
}

@media (max-width: 991px) {
    .card-img-top {
        height: 360px;
    }
}
</style>


