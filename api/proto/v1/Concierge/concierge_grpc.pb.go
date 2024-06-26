// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: proto/concierge.proto

package Concierge

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Concierge_Rollout_FullMethodName = "/concierge.Concierge/Rollout"
)

// ConciergeClient is the client API for Concierge service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ConciergeClient interface {
	Rollout(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Response, error)
}

type conciergeClient struct {
	cc grpc.ClientConnInterface
}

func NewConciergeClient(cc grpc.ClientConnInterface) ConciergeClient {
	return &conciergeClient{cc}
}

func (c *conciergeClient) Rollout(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Response, error) {
	out := new(Response)
	err := c.cc.Invoke(ctx, Concierge_Rollout_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ConciergeServer is the server API for Concierge service.
// All implementations must embed UnimplementedConciergeServer
// for forward compatibility
type ConciergeServer interface {
	Rollout(context.Context, *Request) (*Response, error)
	mustEmbedUnimplementedConciergeServer()
}

// UnimplementedConciergeServer must be embedded to have forward compatible implementations.
type UnimplementedConciergeServer struct {
}

func (UnimplementedConciergeServer) Rollout(context.Context, *Request) (*Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Rollout not implemented")
}
func (UnimplementedConciergeServer) mustEmbedUnimplementedConciergeServer() {}

// UnsafeConciergeServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ConciergeServer will
// result in compilation errors.
type UnsafeConciergeServer interface {
	mustEmbedUnimplementedConciergeServer()
}

func RegisterConciergeServer(s grpc.ServiceRegistrar, srv ConciergeServer) {
	s.RegisterService(&Concierge_ServiceDesc, srv)
}

func _Concierge_Rollout_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ConciergeServer).Rollout(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Concierge_Rollout_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ConciergeServer).Rollout(ctx, req.(*Request))
	}
	return interceptor(ctx, in, info, handler)
}

// Concierge_ServiceDesc is the grpc.ServiceDesc for Concierge service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Concierge_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "concierge.Concierge",
	HandlerType: (*ConciergeServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Rollout",
			Handler:    _Concierge_Rollout_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/concierge.proto",
}
