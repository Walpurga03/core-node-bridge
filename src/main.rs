use core_node_bridge::create_app;
use dotenvy::dotenv;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use axum::http::Method;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);

    let app = create_app().await.layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    println!("Server lauscht auf {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}